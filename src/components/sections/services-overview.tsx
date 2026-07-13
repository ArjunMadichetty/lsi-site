import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { services } from "@/lib/content";

export function ServicesOverview() {
  return (
    <section className="border-b border-border/70 py-20 sm:py-24">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Full-service precision machining"
            description="Milling, turning, finishing, and inspection under one roof — so your parts move from quote to shipped without hand-offs."
          />
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:text-brand"
          >
            View all services
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => (
            <Link
              key={s.slug}
              href={`/services#${s.slug}`}
              className="group relative flex flex-col bg-card p-7 transition-colors hover:bg-brand-subtle/60"
            >
              <span className="font-mono text-xs font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-bold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.short}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-dark opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
                <ArrowUpRight className="size-4" />
              </span>
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
