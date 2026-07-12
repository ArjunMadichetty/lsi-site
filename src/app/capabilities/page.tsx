import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHeading } from "@/components/sections/section-heading";
import { capabilities, materials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Multi-axis CNC milling and turning, tight tolerances to ±0.0002\", a wide material range, and a climate-controlled inspection lab with CMM verification.",
};

// TODO(client): confirm equipment list and specs against the shop's floor.
const equipment = [
  { type: "3-Axis VMC", detail: 'Vertical machining centers · up to 40" × 20" × 25"' },
  { type: "4- & 5-Axis Milling", detail: "Simultaneous 5-axis for complex contours" },
  { type: "CNC Turning", detail: 'Live tooling & sub-spindle · up to 3" bar' },
  { type: "Mill-Turn", detail: "Complete parts finished in a single setup" },
  { type: "Inspection Lab", detail: "CMM & precision gaging, climate-controlled" },
  { type: "Finishing Network", detail: "Anodize, plate, passivate, heat treat" },
];

const quality = [
  "In-process & final inspection with CMM verification",
  "First-article inspection reports (AS9102)",
  "PPAP & material certifications on request",
  "Full lot traceability and documentation",
  "Calibrated tooling & gaging on schedule",
  "Repeatable process controls (SPC)",
];

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="The capacity to make it exactly to print"
        description="Calibrated multi-axis machining centers, a broad material range, and documented quality — engineered to hold the tightest specs, part after part."
      />

      {/* Metrics */}
      <section className="border-b border-border/70 py-16 sm:py-20">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
            {capabilities.map((c) => (
              <div key={c.label} className="bg-card p-6">
                <div className="font-heading text-3xl font-extrabold text-brand-dark">
                  {c.value}
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">{c.label}</div>
                {c.note && <div className="mt-0.5 text-xs text-muted-foreground">{c.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="border-b border-border/70 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Equipment"
            title="Machining & inspection under one roof"
            description="A balanced floor of milling, turning, and mill-turn centers backed by an on-site inspection lab."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((e) => (
              <div key={e.type} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">{e.type}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="border-b border-border/70 py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Materials"
              title="A wide range, machined daily"
              description="From aerospace aluminum and stainless to titanium, superalloys, and engineering plastics. Don't see yours? Ask us — we machine dozens more."
            />
          </div>
          <div className="lg:col-span-7">
            <ul className="flex flex-wrap gap-2.5">
              {materials.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-border bg-brand-subtle/60 px-4 py-2 text-sm font-medium text-foreground/80"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Quality"
            title="Precision you can document"
            description="Quality isn't a final step — it's built into every stage, with the paperwork to prove it."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quality.map((q) => (
              <li
                key={q}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 text-sm text-foreground/80"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
