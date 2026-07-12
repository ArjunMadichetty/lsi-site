import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MessageCircle, Phone } from "lucide-react";
import { QuoteForm } from "@/components/contact/quote-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a fast, detailed quote from LSI. Upload your drawings or CAD files and our team will review them for manufacturability and get back to you quickly.",
};

const tips = [
  "2D drawings (PDF) and/or 3D models (STEP, STP)",
  "Material and finish requirements",
  "Quantity and target delivery date",
  "Critical tolerances or inspection needs",
];

export default function QuotePage() {
  return (
    <>
      <section className="border-b border-border/70 bg-brand-subtle/50">
        <div className="container-page py-14 sm:py-16">
          <p className="eyebrow">Request a Quote</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Let&apos;s get your parts made
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
            Send us your drawings or CAD files and a few details. We&apos;ll
            review your part for manufacturability and follow up with a detailed
            quote — fast.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-brand-subtle/60 p-6">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark">
                Helpful to include
              </h2>
              <ul className="mt-4 space-y-2.5">
                {tips.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                Prefer to talk it through first?
              </p>
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 font-medium text-foreground hover:text-brand-dark"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-muted text-brand-dark">
                  <Phone className="size-4" />
                </span>
                {site.phone}
              </a>
              <Link
                href={site.contactCta.href}
                className="flex items-center gap-3 font-medium text-foreground hover:text-brand-dark"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-muted text-brand-dark">
                  <MessageCircle className="size-4" />
                </span>
                Send us a message
              </Link>
              <p className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Clock className="size-4" />
                </span>
                {site.hours}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
