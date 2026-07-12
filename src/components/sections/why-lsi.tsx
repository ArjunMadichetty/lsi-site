import { ShieldCheck, Ruler, Clock, Layers } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { differentiators } from "@/lib/content";

const icons = [ShieldCheck, Ruler, Clock, Layers];

export function WhyLsi() {
  return (
    <section className="border-b border-border/70 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why LSI"
          title="A shop your engineers can rely on"
          description="Precision is table stakes. What sets us apart is documentation, responsiveness, and delivery you can plan around."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((d, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={d.title}
                className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[0_18px_50px_-30px_rgba(16,61,26,0.45)]"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-muted text-brand-dark ring-1 ring-inset ring-brand/15">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {d.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
