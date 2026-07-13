import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { WhyLsi } from "@/components/sections/why-lsi";
import { Button } from "@/components/ui/button";
import { stats } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "LSI is a precision CNC manufacturing shop built on tight tolerances, documented quality, and on-time delivery — a partner your engineers can rely on.",
};

// TODO(client): replace with the shop's real story, founding year, and values.
const values = [
  { title: "Precision first", description: "We machine to print and prove it with inspection data — no shortcuts on tolerances." },
  { title: "Straight answers", description: "Honest lead times, transparent quotes, and proactive DFM feedback." },
  { title: "Ownership", description: "We treat your parts like our own — and stand behind every one that ships." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About LSI"
        title="A machine shop your engineers can rely on"
        description="We exist to make precision parts the right way — held to spec, documented, and delivered on time, run after run."
      />

      {/* Story */}
      <section className="border-b border-border/70 py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow">Our story</p>
            <div className="mt-4 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                {site.fullName} ({site.name}) is a precision CNC manufacturing
                shop serving demanding industries with tight-tolerance machined
                parts — from one-off prototypes to documented production runs.
              </p>
              <p>
                {/* TODO(client): personalize this paragraph with the shop's history. */}
                We&apos;ve built our reputation on a simple promise: parts made
                right, on time. That means investing in capable equipment, a
                real inspection lab, and a team that sweats the details — so our
                customers can build with confidence.
              </p>
              <p>
                Whether you need a quick first article or a scheduled production
                program, we bring the same rigor to every job.
              </p>
            </div>
            <Button asChild className="mt-8">
              <Link href={site.cta.href}>
                Start a project
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {stats.map((s) => (
                <div key={s.label} className="bg-card p-6">
                  <div className="font-heading text-3xl font-extrabold text-brand-dark">
                    {s.value}
                  </div>
                  <div className="mt-2 text-xs font-medium text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border/70 py-16 sm:py-20">
        <div className="container-page">
          <p className="eyebrow">What we stand for</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-7">
                <span className="font-mono text-xs font-semibold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-bold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyLsi />
      <CtaBand />
    </>
  );
}
