"use client";

import { useRef, useState } from "react";
import { CheckCircle2, FileUp, Loader2, Paperclip, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  quoteSchema,
  serviceOptions,
  quantityOptions,
  UPLOAD_ACCEPT,
  UPLOAD_MAX_BYTES,
  UPLOAD_MAX_FILES,
} from "@/lib/quote-schema";
import { cn } from "@/lib/utils";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  material: string;
  quantity: string;
  tolerance: string;
  dueDate: string;
  message: string;
};

const initial: Values = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  material: "",
  quantity: "",
  tolerance: "",
  dueDate: "",
  message: "",
};

function fmtBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export function QuoteForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ refId: string | null } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Values) => (v: string) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: "" } : prev));
  };

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    const merged = [...files];
    for (const f of incoming) {
      if (merged.length >= UPLOAD_MAX_FILES) {
        toast.error(`You can attach up to ${UPLOAD_MAX_FILES} files.`);
        break;
      }
      if (f.size > UPLOAD_MAX_BYTES) {
        toast.error(
          `"${f.name}" is over ${Math.round(UPLOAD_MAX_BYTES / 1024 / 1024)}MB — send it as a link instead.`,
        );
        continue;
      }
      if (!merged.some((m) => m.name === f.name && m.size === f.size)) merged.push(f);
    }
    setFiles(merged);
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = quoteSchema.safeParse({ ...values, website: "" });
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const flat: Record<string, string> = {};
      for (const [k, v] of Object.entries(fieldErrors)) if (v?.[0]) flat[k] = v[0];
      setErrors(flat);
      toast.error("Please fix the highlighted fields.");
      const first = document.querySelector<HTMLElement>(`[data-field="${Object.keys(flat)[0]}"]`);
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => fd.append(k, v));
      fd.append("website", honeypotRef.current?.value ?? "");
      files.forEach((f) => fd.append("files", f));

      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        if (data.fieldErrors) {
          const flat: Record<string, string> = {};
          for (const [k, v] of Object.entries(data.fieldErrors as Record<string, string[]>))
            if (v?.[0]) flat[k] = v[0];
          setErrors(flat);
        }
        toast.error(data.error || "Something went wrong. Please try again.");
        return;
      }

      setDone({ refId: data.refId ?? null });
      setValues(initial);
      setFiles([]);
      toast.success("Quote request sent — we'll be in touch shortly.");
    } catch {
      toast.error("Network error. Please try again or give us a call.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand-muted text-brand-dark">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-2xl font-bold text-foreground">Request received</h3>
        <p className="mt-2 max-w-md text-muted-foreground">
          Thanks — your quote request is in. Our team will review your details
          {done.refId ? (
            <>
              {" "}
              (reference <span className="font-mono font-semibold text-brand-dark">#{done.refId}</span>)
            </>
          ) : null}{" "}
          and get back to you shortly.
        </p>
        <Button className="mt-7" variant="outline" onClick={() => setDone(null)}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      {/* honeypot */}
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
        <Field label="Name" required error={errors.name} name="name">
          <Input
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Jane Machinist"
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Company" error={errors.company} name="company">
          <Input
            value={values.company}
            onChange={(e) => set("company")(e.target.value)}
            placeholder="Acme Robotics"
            autoComplete="organization"
          />
        </Field>
        <Field label="Email" required error={errors.email} name="email">
          <Input
            type="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="jane@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
        </Field>
        <Field label="Phone" error={errors.phone} name="phone">
          <Input
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
            placeholder="(555) 123-4567"
            autoComplete="tel"
          />
        </Field>

        <Field label="Service" name="service">
          <Select value={values.service} onValueChange={set("service")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Estimated quantity" name="quantity">
          <Select value={values.quantity} onValueChange={set("quantity")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select quantity" />
            </SelectTrigger>
            <SelectContent>
              {quantityOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Material" name="material">
          <Input
            value={values.material}
            onChange={(e) => set("material")(e.target.value)}
            placeholder="6061 Aluminum, 316 SS…"
          />
        </Field>
        <Field label="Tolerance / finish" name="tolerance">
          <Input
            value={values.tolerance}
            onChange={(e) => set("tolerance")(e.target.value)}
            placeholder='±0.001", anodized…'
          />
        </Field>

        <Field label="Target date" name="dueDate" className="sm:col-span-2 sm:max-w-[50%]">
          <Input
            type="date"
            value={values.dueDate}
            onChange={(e) => set("dueDate")(e.target.value)}
          />
        </Field>

        <Field label="Project details" required error={errors.message} name="message" className="sm:col-span-2">
          <Textarea
            value={values.message}
            onChange={(e) => set("message")(e.target.value)}
            placeholder="Tell us about your part — dimensions, tolerances, finish, application, and anything else that helps us quote accurately."
            rows={5}
            aria-invalid={!!errors.message}
          />
        </Field>

        {/* File upload */}
        <div className="sm:col-span-2">
          <Label className="mb-2 block">
            Drawings &amp; CAD files{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addFiles(e.dataTransfer.files);
            }}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
              dragging
                ? "border-brand bg-brand-muted/60"
                : "border-border bg-muted/40 hover:border-brand/50 hover:bg-brand-subtle/50",
            )}
          >
            <FileUp className="size-6 text-brand" aria-hidden />
            <p className="mt-2 text-sm font-medium text-foreground">
              Drop files here or <span className="text-brand-dark underline">browse</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              STEP, STP, PDF, DXF, DWG, STL, ZIP… · up to {UPLOAD_MAX_FILES} files ·{" "}
              {Math.round(UPLOAD_MAX_BYTES / 1024 / 1024)}MB each
            </p>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={UPLOAD_ACCEPT}
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>

          {files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {files.map((f, i) => (
                <li
                  key={`${f.name}-${i}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Paperclip className="size-4 shrink-0 text-brand" aria-hidden />
                    <span className="truncate">{f.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{fmtBytes(f.size)}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label={`Remove ${f.name}`}
                  >
                    <X className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-7 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We&apos;ll only use your details to prepare your quote.
        </p>
        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Send quote request"
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  name,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  name: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)} data-field={name}>
      <Label className="text-foreground/80">
        {label}
        {required && <span className="text-brand"> *</span>}
      </Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
