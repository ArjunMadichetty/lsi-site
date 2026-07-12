import "server-only";
import { saveQuote, type QuoteRecord } from "@/lib/db";
import { sendQuoteEmail, type Attachment } from "@/lib/notify/email";
import { sendQuoteSms } from "@/lib/notify/sms";

export type SinkStatus = "ok" | "skipped" | "error";

export type QuoteOutcome = {
  ok: boolean;
  refId: string | null;
  sinks: { db: SinkStatus; email: SinkStatus; sms: SinkStatus };
};

/**
 * Persist + notify for a new quote. Runs the DB write first (to obtain a
 * reference id) then fires email + SMS. Considers the submission successful
 * ("nothing lost") if a durable sink (DB or email) succeeded — or, in a fully
 * unconfigured local environment, if every sink was skipped.
 */
export async function processQuote(
  rec: QuoteRecord,
  attachments: Attachment[],
): Promise<QuoteOutcome> {
  const sinks: QuoteOutcome["sinks"] = { db: "skipped", email: "skipped", sms: "skipped" };

  // 1) Database (best-effort, gives us a ref id)
  let refId: string | null = null;
  try {
    refId = await saveQuote(rec);
    sinks.db = refId ? "ok" : "skipped";
  } catch (err) {
    sinks.db = "error";
    console.error("[quote] DB write failed:", err instanceof Error ? err.message : err);
  }

  // 2) Email + SMS in parallel
  const [emailRes, smsRes] = await Promise.allSettled([
    sendQuoteEmail(rec, attachments, refId),
    sendQuoteSms(rec, refId),
  ]);

  if (emailRes.status === "fulfilled") {
    sinks.email = emailRes.value.skipped ? "skipped" : emailRes.value.ok ? "ok" : "error";
    if (emailRes.value.error) console.error("[quote] email error:", emailRes.value.error);
  } else {
    sinks.email = "error";
    console.error("[quote] email threw:", emailRes.reason);
  }

  if (smsRes.status === "fulfilled") {
    sinks.sms = smsRes.value.skipped ? "skipped" : smsRes.value.ok ? "ok" : "error";
    if (smsRes.value.error) console.error("[quote] sms error:", smsRes.value.error);
  } else {
    sinks.sms = "error";
    console.error("[quote] sms threw:", smsRes.reason);
  }

  const durableOk = sinks.db === "ok" || sinks.email === "ok";
  const allSkipped = sinks.db === "skipped" && sinks.email === "skipped";
  const ok = durableOk || allSkipped;

  if (!ok) {
    console.error("[quote] No durable sink succeeded — submission may be lost.", sinks);
  } else if (allSkipped) {
    console.warn("[quote] All sinks skipped (no DB/email configured). Logging submission:", {
      ...rec,
      attachments: attachments.map((a) => a.filename),
    });
  }

  return { ok, refId, sinks };
}
