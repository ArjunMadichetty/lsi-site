import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { capabilities, materials } from "@/lib/content";

export function CapabilitiesBand() {
  return (
    <section className="relative overflow-hidden bg-brand-dark text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" aria-hidden />
      <div className="container-page relative py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Capabilities
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Built to hold the tightest specs
            </h2>
            <p className="mt-4 max-w-md text-balance leading-relaxed text-white/70">
              Calibrated multi-axis machining centers, a climate-controlled
              inspection lab, and a wide material range — the capacity to make
              your part exactly to print.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/15 bg-white/10">
              {capabilities.map((c) => (
                <div key={c.label} className="bg-brand-dark p-5">
                  <div className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                    {c.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-white/55">
                    {c.label}
                  </div>
                  {c.note && (
                    <div className="mt-0.5 text-xs text-white/45">{c.note}</div>
                  )}
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-8 bg-white text-brand-dark hover:bg-white/90"
            >
              <Link href="/capabilities">
                Full capabilities
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/15 bg-white/[0.04] p-7 backdrop-blur-sm">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Materials we machine
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {materials.map((m) => (
                  <li
                    key={m}
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/85"
                  >
                    {m}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-white/60">
                Don&apos;t see your material? We machine dozens more — from
                exotic superalloys to engineering plastics. Ask us on your
                quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
