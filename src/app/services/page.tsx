import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "CNC Machining Services",
  description:
    "CNC milling, turning, prototyping, production runs, finishing, assembly, and inspection — full-service precision machining from LSI.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Full-service precision machining"
        description="From first article to full production, LSI delivers complete parts under one roof — milling, turning, finishing, and inspection with documentation you can trust."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page space-y-5">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="scroll-mt-24 grid gap-8 rounded-2xl border border-border bg-card p-7 sm:p-9 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-7">
                <span className="font-mono text-xs font-semibold text-brand">
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <Button asChild variant="link" className="mt-4 h-auto p-0 text-brand-dark">
                  <Link href={site.cta.href}>
                    Request a quote for {s.title.toLowerCase()}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-xl bg-brand-subtle/60 p-6">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark">
                    Highlights
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-foreground/80">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
