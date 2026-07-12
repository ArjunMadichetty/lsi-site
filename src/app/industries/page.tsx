import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Process } from "@/components/sections/process";
import { industries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "LSI machines precision parts for aerospace & defense, medical, robotics, semiconductor, energy, and industrial equipment — where precision is non-negotiable.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Trusted where precision is non-negotiable"
        description="From flight hardware to surgical instruments, we deliver parts for the industries that can't afford to be off-spec — with the documentation to back it up."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <div
              key={ind.name}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-7"
            >
              <span className="font-mono text-xs font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 text-xl font-bold text-foreground">{ind.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {ind.description}
              </p>
              <span
                className="pointer-events-none absolute -bottom-8 -right-8 size-24 rounded-full bg-brand-muted"
                aria-hidden
              />
            </div>
          ))}
        </div>
      </section>

      <Process />
      <CtaBand />
    </>
  );
}
