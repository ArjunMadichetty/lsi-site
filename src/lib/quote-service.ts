import "server-only";
import { saveQuote, type QuoteRecord } from "@/lib/db";
import { sendQuoteEmail, type Attachment } from "@/lib/notify/email";

export type SinkStatus = "ok" | "skipped" | "error";

export type QuoteOutcome = {
  ok: boolean;
  refId: string | null;
  sinks: { db: SinkStatus; email: SinkStatus };
};

/**
 * Persist + notify for a new quote/contact submission. Saves to the DB (for a
 * reference id) then emails the shop. Considers the submission successful
 * ("nothing lost") if a durable sink (DB or email) succeeded — or, in a fully
 * unconfigured local environment, if every sink was skipped.
 */
export async function processQuote(
  rec: QuoteRecord,
  attachments: Attachment[],
): Promise<QuoteOutcome> {
  const sinks: QuoteOutcome["sinks"] = { db: "skipped", email: "skipped" };

  // 1) Database (best-effort, gives us a ref id)
  let refId: string | null = null;
  try {
    refId = await saveQuote(rec);
    sinks.db = refId ? "ok" : "skipped";
  } catch (err) {
    sinks.db = "error";
    console.error("[quote] DB write failed:", err instanceof Error ? err.message : err);
  }

  // 2) Email the shop
  try {
    const emailRes = await sendQuoteEmail(rec, attachments, refId);
    sinks.email = emailRes.skipped ? "skipped" : emailRes.ok ? "ok" : "error";
    if (emailRes.error) console.error("[quote] email error:", emailRes.error);
  } catch (err) {
    sinks.email = "error";
    console.error("[quote] email threw:", err instanceof Error ? err.message : err);
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
