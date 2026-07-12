import { SectionHeading } from "@/components/sections/section-heading";
import { industries } from "@/lib/content";

export function Industries() {
  return (
    <section className="border-b border-border/70 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Industries served"
          title="Trusted where precision is non-negotiable"
          description="From flight hardware to surgical instruments, LSI delivers parts for the industries that can't afford to be off-spec."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="relative overflow-hidden rounded-xl border border-border bg-card p-6"
            >
              <span
                className="absolute right-0 top-0 h-16 w-16 translate-x-6 -translate-y-6 rounded-full bg-brand-muted"
                aria-hidden
              />
              <h3 className="relative text-lg font-bold text-foreground">
                {ind.name}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {ind.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
