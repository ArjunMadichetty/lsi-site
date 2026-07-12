import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/content";

export function SiteFooter() {
  const year = 2026; // build-time constant; update annually or wire to build date

  return (
    <footer className="bg-brand-dark text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:py-16">
        {/* Brand + blurb */}
        <div className="lg:col-span-4">
          <div className="inline-flex rounded-md bg-white px-3 py-2">
            {/* logo sits on a white chip so the mark reads on dark */}
            <Link href="/" aria-label="LSI home" className="inline-flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="LSI" width={88} height={44} className="h-9 w-auto" />
            </Link>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            {site.tagline}. Tight-tolerance machined parts, prototypes, and
            production runs — made right, on time.
          </p>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="lg:col-span-2">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Company
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {site.nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0" aria-hidden />
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2 text-white/70">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/55 sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-widest">{site.hours}</p>
        </div>
      </div>
    </footer>
  );
}
