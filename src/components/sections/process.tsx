import { SectionHeading } from "@/components/sections/section-heading";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section className="border-b border-border/70 bg-brand-subtle/50 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From drawing to doorstep"
          description="A straightforward path from your files to finished parts — with engineering support at every step."
        />

        <ol className="mt-14 grid gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.n} className="relative">
              {/* connector line */}
              {i < processSteps.length - 1 && (
                <span
                  className="absolute left-12 top-5 hidden h-px w-[calc(100%-1rem)] bg-gradient-to-r from-brand/40 to-transparent lg:block"
                  aria-hidden
                />
              )}
              <div className="flex size-10 items-center justify-center rounded-full bg-brand font-heading text-sm font-bold text-brand-foreground shadow-sm">
                {step.n}
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
