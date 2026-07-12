import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { stats } from "@/lib/content";

const trust = [
  "±0.0002\" tolerances",
  "3-, 4- & 5-axis",
  "Prototype → production",
  "Made in USA",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-background">
      {/* faint engineering grid + radial fade */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,#000_55%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--brand) 16%, transparent), transparent)",
        }}
        aria-hidden
      />

      <div className="container-page relative flex flex-col items-center py-16 text-center sm:py-20 lg:py-24">
        <p className="eyebrow">{site.tagline}</p>

        {/* Logo plate — the mark, framed like a machined part drawing */}
        <div className="relative mt-8">
          {/* registration ticks */}
          <CornerTicks />
          <div className="relative rounded-xl border border-border bg-card px-10 py-8 shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_50px_-24px_rgba(16,61,26,0.35)] sm:px-16 sm:py-10">
            <span className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
              LSI
            </span>
            <span className="absolute right-4 top-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
              Rev. A
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="LSI — Precision CNC Manufacturing"
              width={340}
              height={170}
              className="mx-auto h-28 w-auto sm:h-36"
            />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
              Precision · Machined · Complete
            </span>
          </div>
        </div>

        <h1 className="mt-10 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Precision CNC parts,{" "}
          <span className="text-brand">made right</span> — on time.
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
          LSI machines tight-tolerance components in metal and plastic — from
          rapid prototypes to documented production runs. Upload your drawings
          and get a fast, detailed quote.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="min-w-52 text-base">
            <Link href={site.cta.href}>
              {site.cta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-w-52 text-base"
          >
            <Link href="/capabilities">Explore Capabilities</Link>
          </Button>
        </div>

        <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {trust.map((t) => (
            <li
              key={t}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70"
            >
              <CheckCircle2 className="size-4 text-brand" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats strip */}
      <div className="border-t border-border/70 bg-brand-subtle/60">
        <dl className="container-page grid grid-cols-2 divide-border/60 py-8 sm:divide-x lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center px-4 py-3 text-center sm:px-6 ${
                i > 0 ? "sm:border-l sm:border-border/60" : ""
              }`}
            >
              <dt className="order-2 mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {s.label}
              </dt>
              <dd className="order-1 font-heading text-2xl font-extrabold text-brand-dark sm:text-3xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CornerTicks() {
  const base =
    "pointer-events-none absolute h-5 w-5 border-brand/60";
  return (
    <>
      <span className={`${base} -left-2 -top-2 border-l-2 border-t-2`} aria-hidden />
      <span className={`${base} -right-2 -top-2 border-r-2 border-t-2`} aria-hidden />
      <span className={`${base} -bottom-2 -left-2 border-b-2 border-l-2`} aria-hidden />
      <span className={`${base} -bottom-2 -right-2 border-b-2 border-r-2`} aria-hidden />
    </>
  );
}
