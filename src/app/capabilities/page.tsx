import type { Metadata } from "next";
import { Check, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHeading } from "@/components/sections/section-heading";
import { machines, materials } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Capabilities & Machines",
  description:
    "The LSI shop floor: Haas CNC vertical mills, a CNC mill-turn lathe, manual lathe and Bridgeport mill, and in-house MIG welding — plus a wide material range.",
};

const quality = [
  "In-process & final inspection",
  "Material certifications on request",
  "First-article inspection reports",
  "Full lot traceability",
  "Calibrated tooling & gaging",
  "Weld + machine complete in-house",
];

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Real machines, real capacity"
        description="A working shop floor of Haas CNC machining centers, CNC and manual lathes, a Bridgeport mill, and in-house MIG welding — the range to take your part from raw stock to finished, welded, and inspected."
      />

      {/* Machines — the focus */}
      <section className="border-b border-border/70 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Shop floor"
            title="The machines behind your parts"
            description="From CNC production to quick manual work and in-house welding — the equipment to make your part complete, without extra vendors."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {machines.map((m, i) => {
              const spanFull = i === machines.length - 1 && machines.length % 2 === 1;
              return (
                <article
                  key={m.name}
                  className={cn(
                    "flex flex-col rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-[0_18px_50px_-30px_rgba(16,61,26,0.45)]",
                    spanFull && "lg:col-span-2",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs font-semibold text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-brand-muted px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-brand-dark">
                      {m.tag}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-foreground">{m.name}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>

                  <ul className={cn("mt-5 grid gap-2.5", spanFull ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2")}>
                    {m.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-foreground/80">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    <div className="border-t border-border pt-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        Typical parts
                      </span>
                      <p className="mt-1 text-sm font-medium text-foreground">{m.samples}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Materials + Quality (compact, side by side) */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Materials</p>
            <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
              A wide range, machined daily
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
              From aerospace aluminum and stainless to titanium, superalloys, and
              engineering plastics. Don&apos;t see yours? Ask us — we machine
              dozens more.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {materials.map((mat) => (
                <li
                  key={mat}
                  className="rounded-full border border-border bg-brand-subtle/60 px-4 py-2 text-sm font-medium text-foreground/80"
                >
                  {mat}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Quality</p>
            <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
              Precision you can document
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
              Quality is built into every stage — with inspection and paperwork to
              back it up.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {quality.map((q) => (
                <li
                  key={q}
                  className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-4 text-sm text-foreground/80"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
