import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk it through with LSI. Call, email, or send us a message and we'll help you scope your CNC machining project. Have drawings ready? Request a quote.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border/70 bg-brand-subtle/50">
        <div className="container-page py-14 sm:py-16">
          <p className="eyebrow">Contact Us</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Talk it through with a real machinist
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
            Not sure where to start, or just have a question? Reach out and
            we&apos;ll help you scope your project. Already have drawings?{" "}
            <Link href={site.cta.href} className="font-medium text-brand-dark underline">
              Request a quote
            </Link>{" "}
            instead.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Contact details */}
          <div className="lg:col-span-4">
            <h2 className="text-xl font-bold text-foreground">Get in touch</h2>
            <p className="mt-3 text-muted-foreground">
              We&apos;re happy to talk through materials, tolerances, lead times,
              or anything else on your mind.
            </p>

            <ul className="mt-7 space-y-5">
              <ContactItem icon={Phone} label="Phone" href={site.phoneHref}>
                {site.phone}
              </ContactItem>
              <ContactItem icon={Mail} label="Email" href={`mailto:${site.email}`}>
                {site.email}
              </ContactItem>
              <ContactItem icon={MapPin} label="Shop">
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </ContactItem>
              <ContactItem icon={Clock} label="Hours">
                {site.hours}
              </ContactItem>
            </ul>

            <div className="mt-9 rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground">Ready to quote a part?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Upload your drawings or CAD files and we&apos;ll get you a
                detailed quote, fast.
              </p>
              <Button asChild className="mt-4">
                <Link href={site.cta.href}>
                  {site.cta.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>

          {/* Message form */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const body = (
    <>
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand-dark ring-1 ring-inset ring-brand/15">
        <Icon className="size-5" />
      </span>
      <span>
        <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="mt-0.5 block font-medium text-foreground">{children}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="group flex items-start gap-4 hover:text-brand-dark">
          {body}
        </a>
      ) : (
        <div className="flex items-start gap-4">{body}</div>
      )}
    </li>
  );
}
