"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { quoteSchema } from "@/lib/quote-schema";
import { cn } from "@/lib/utils";

type Values = { name: string; email: string; phone: string; message: string };
const initial: Values = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Values) => (v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    setErrors((p) => (p[k] ? { ...p, [k]: "" } : p));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = quoteSchema.safeParse({ ...values, website: "" });
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      const flat: Record<string, string> = {};
      for (const [k, v] of Object.entries(fe)) if (v?.[0]) flat[k] = v[0];
      setErrors(flat);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append("email", values.email);
      fd.append("phone", values.phone);
      fd.append("message", values.message);
      fd.append("kind", "contact");
      fd.append("website", honeypotRef.current?.value ?? "");

      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        toast.error(data.error || "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
      setValues(initial);
      toast.success("Message sent — we'll be in touch shortly.");
    } catch {
      toast.error("Network error. Please try again or give us a call.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-12 text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand-muted text-brand-dark">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-2xl font-bold text-foreground">Message sent</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Thanks for reaching out — we&apos;ll get back to you shortly.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setDone(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Name <span className="text-brand">*</span></Label>
          <Input
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-xs font-medium text-destructive">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Phone</Label>
          <Input
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
            placeholder="(770) 123-4567"
            autoComplete="tel"
          />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label>Email <span className="text-brand">*</span></Label>
          <Input
            type="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-xs font-medium text-destructive">{errors.email}</p>}
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label>How can we help? <span className="text-brand">*</span></Label>
          <Textarea
            value={values.message}
            onChange={(e) => set("message")(e.target.value)}
            placeholder="Tell us a bit about what you're working on and we'll point you in the right direction."
            rows={5}
            aria-invalid={!!errors.message}
          />
          {errors.message && <p className="text-xs font-medium text-destructive">{errors.message}</p>}
        </div>
      </div>
      <div className={cn("mt-6 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between")}>
        <p className="text-xs text-muted-foreground">
          Have drawings ready? <a href="/quote" className="font-medium text-brand-dark underline">Request a quote</a> instead.
        </p>
        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </div>
    </form>
  );
}
