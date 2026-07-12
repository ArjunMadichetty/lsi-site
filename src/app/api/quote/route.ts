import { NextResponse } from "next/server";
import { quoteSchema, UPLOAD_MAX_BYTES, UPLOAD_MAX_FILES } from "@/lib/quote-schema";
import { processQuote } from "@/lib/quote-service";
import type { QuoteRecord } from "@/lib/db";
import type { Attachment } from "@/lib/notify/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// --- tiny in-memory rate limiter (per IP) ---------------------------------
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude memory cap
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form data." }, { status: 400 });
  }

  // Honeypot: pretend success to silently drop bots.
  const honeypot = String(form.get("website") ?? "");
  if (honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true, refId: null });
  }

  const fields = {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    phone: String(form.get("phone") ?? ""),
    company: String(form.get("company") ?? ""),
    service: String(form.get("service") ?? ""),
    material: String(form.get("material") ?? ""),
    quantity: String(form.get("quantity") ?? ""),
    tolerance: String(form.get("tolerance") ?? ""),
    dueDate: String(form.get("dueDate") ?? ""),
    message: String(form.get("message") ?? ""),
    website: honeypot,
  };

  const parsed = quoteSchema.safeParse(fields);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  // Files
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > UPLOAD_MAX_FILES) {
    return NextResponse.json(
      { ok: false, error: `Please attach at most ${UPLOAD_MAX_FILES} files.` },
      { status: 422 },
    );
  }

  const attachments: Attachment[] = [];
  for (const file of files) {
    if (file.size > UPLOAD_MAX_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: `"${file.name}" is larger than ${Math.round(UPLOAD_MAX_BYTES / 1024 / 1024)}MB. Email it to us directly or send a download link in your message.`,
        },
        { status: 422 },
      );
    }
    const buf = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name || "attachment",
      content: buf,
      contentType: file.type || undefined,
    });
  }

  const kind = String(form.get("kind") ?? "quote") === "contact" ? "contact" : "quote";

  const record: QuoteRecord = {
    ...parsed.data,
    kind,
    fileNames: attachments.map((a) => a.filename),
    sourceIp: ip,
  } as QuoteRecord;

  const outcome = await processQuote(record, attachments);

  if (!outcome.ok) {
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your request. Please call us or try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, refId: outcome.refId });
}
