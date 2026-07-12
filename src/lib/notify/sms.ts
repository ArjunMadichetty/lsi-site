import "server-only";
import { site } from "@/lib/site";
import { humanizeService } from "@/lib/quote-schema";
import type { QuoteRecord } from "@/lib/db";

/**
 * SMS / text notification via the Linq Partner API.
 * Docs: https://docs.linqapp.com  —  POST /api/partner/v3/chats
 *   Headers: Authorization: Bearer <LINQ_API_KEY>
 *   Body:    { from, to: [..], message: { parts: [{ type:"text", value }] } }
 *
 * Sends iMessage → RCS → SMS with automatic fallback based on recipient.
 * No-ops gracefully until LINQ_API_KEY / LINQ_FROM_NUMBER / recipient are set.
 */

const LINQ_ENDPOINT =
  process.env.LINQ_API_URL || "https://api.linqapp.com/api/partner/v3/chats";

export type SmsResult = { ok: boolean; skipped?: boolean; error?: string };

function buildMessage(rec: QuoteRecord, refId: string | null): string {
  const who = rec.company ? `${rec.name} (${rec.company})` : rec.name;
  const contact = rec.phone || rec.email;
  return [
    `New ${site.name} ${rec.kind === "contact" ? "message" : "quote"}${refId ? ` #${refId}` : ""}:`,
    who,
    `${humanizeService(rec.service)}`,
    rec.fileNames?.length ? `${rec.fileNames.length} file(s)` : null,
    `Contact: ${contact}`,
  ]
    .filter(Boolean)
    .join(" · ");
}

export async function sendQuoteSms(
  rec: QuoteRecord,
  refId: string | null,
): Promise<SmsResult> {
  const apiKey = process.env.LINQ_API_KEY;
  const from = process.env.LINQ_FROM_NUMBER;
  const to = process.env.SHOP_NOTIFICATION_PHONE || site.notify.phone;

  if (!apiKey || !from || !to) {
    console.warn("[sms] Linq not configured (need LINQ_API_KEY, LINQ_FROM_NUMBER, SHOP_NOTIFICATION_PHONE) — skipping SMS.");
    return { ok: false, skipped: true };
  }

  try {
    const res = await fetch(LINQ_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        message: { parts: [{ type: "text", value: buildMessage(rec, refId) }] },
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, error: `Linq ${res.status}: ${detail.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
