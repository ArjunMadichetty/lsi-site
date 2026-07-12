import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-brand-dark px-6 py-14 text-center sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
          <div
            className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklch, var(--brand) 45%, transparent), transparent)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Ready when you are
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Get a quote on your next part
            </h2>
            <p className="mt-4 text-balance text-lg leading-relaxed text-white/75">
              Send your drawings or CAD files and our team will review them for
              manufacturability and get you a detailed quote — fast.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="min-w-52 bg-white text-base text-brand-dark hover:bg-white/90"
              >
                <Link href={site.cta.href}>
                  {site.cta.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-w-52 border-white/25 bg-transparent text-base text-white hover:bg-white/10 hover:text-white"
              >
                <a href={site.phoneHref}>
                  <Phone className="size-4" aria-hidden />
                  {site.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
