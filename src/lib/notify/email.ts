import "server-only";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { humanizeService, humanizeQuantity } from "@/lib/quote-schema";
import type { QuoteRecord } from "@/lib/db";

export type Attachment = { filename: string; content: Buffer; contentType?: string };

export type EmailResult = { ok: boolean; skipped?: boolean; id?: string; error?: string };

const FROM = process.env.QUOTE_FROM_EMAIL || "LSI Quotes <onboarding@resend.dev>";
const TO = process.env.SHOP_NOTIFICATION_EMAIL || site.notify.email;

function esc(v?: string) {
  return (v || "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildHtml(rec: QuoteRecord, refId: string | null) {
  const rows: [string, string][] = [
    ["Name", rec.name],
    ["Company", rec.company || "—"],
    ["Email", rec.email],
    ["Phone", rec.phone || "—"],
    ["Service", humanizeService(rec.service)],
    ["Material", rec.material || "—"],
    ["Quantity", humanizeQuantity(rec.quantity)],
    ["Tolerance", rec.tolerance || "—"],
    ["Target date", rec.dueDate || "—"],
    ["Files", rec.fileNames?.length ? rec.fileNames.join(", ") : "None attached"],
  ];
  const rowsHtml = rows
    .map(
      ([k, v]) => `<tr>
        <td style="padding:8px 14px;background:#f6faf7;border:1px solid #e6efe8;font:600 12px/1.4 -apple-system,Segoe UI,Arial;color:#2f6b45;text-transform:uppercase;letter-spacing:.05em;white-space:nowrap;vertical-align:top;">${esc(k)}</td>
        <td style="padding:8px 14px;border:1px solid #e6efe8;font:14px/1.5 -apple-system,Segoe UI,Arial;color:#14251b;">${esc(v)}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#f2f5f3;padding:24px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;">
    <tr><td style="background:#1e5631;border-radius:12px 12px 0 0;padding:22px 26px;">
      <div style="font:800 22px/1 -apple-system,Segoe UI,Arial;color:#fff;">${rec.kind === "contact" ? "New Contact Message" : "New Quote Request"}</div>
      <div style="font:13px/1.5 -apple-system,Segoe UI,Arial;color:#c9e2d1;margin-top:6px;">
        ${refId ? `Ref #${esc(refId)} · ` : ""}Submitted via ${esc(site.name)} website
      </div>
    </td></tr>
    <tr><td style="background:#fff;padding:22px 26px;border:1px solid #e6efe8;border-top:0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rowsHtml}</table>
      <div style="margin-top:18px;">
        <div style="font:600 12px/1.4 -apple-system,Segoe UI,Arial;color:#2f6b45;text-transform:uppercase;letter-spacing:.05em;">Project details</div>
        <div style="font:14px/1.6 -apple-system,Segoe UI,Arial;color:#14251b;margin-top:6px;white-space:pre-wrap;">${esc(rec.message)}</div>
      </div>
      <a href="mailto:${esc(rec.email)}" style="display:inline-block;margin-top:22px;background:#2f8a45;color:#fff;text-decoration:none;font:600 14px -apple-system,Segoe UI,Arial;padding:11px 20px;border-radius:8px;">Reply to ${esc(rec.name)}</a>
    </td></tr>
    <tr><td style="padding:14px 26px;font:12px/1.5 -apple-system,Segoe UI,Arial;color:#7b8a80;">
      Uploaded files (if any) are attached to this email.
    </td></tr>
  </table></body></html>`;
}

function buildText(rec: QuoteRecord, refId: string | null) {
  return [
    `NEW QUOTE REQUEST${refId ? ` (Ref #${refId})` : ""}`,
    `Name:      ${rec.name}`,
    `Company:   ${rec.company || "—"}`,
    `Email:     ${rec.email}`,
    `Phone:     ${rec.phone || "—"}`,
    `Service:   ${humanizeService(rec.service)}`,
    `Material:  ${rec.material || "—"}`,
    `Quantity:  ${humanizeQuantity(rec.quantity)}`,
    `Tolerance: ${rec.tolerance || "—"}`,
    `Due:       ${rec.dueDate || "—"}`,
    `Files:     ${rec.fileNames?.length ? rec.fileNames.join(", ") : "None"}`,
    ``,
    `Details:`,
    rec.message,
  ].join("\n");
}

/** Email the shop about a new quote. Returns skipped:true if unconfigured. */
export async function sendQuoteEmail(
  rec: QuoteRecord,
  attachments: Attachment[],
  refId: string | null,
): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping email.");
    return { ok: false, skipped: true };
  }
  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: rec.email,
      subject: `${rec.kind === "contact" ? "New message" : "New quote"}: ${rec.name}${rec.company ? ` — ${rec.company}` : ""}`,
      html: buildHtml(rec, refId),
      text: buildText(rec, refId),
      attachments: attachments.map((a) => ({
        filename: a.filename,
        content: a.content,
        contentType: a.contentType,
      })),
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data?.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
