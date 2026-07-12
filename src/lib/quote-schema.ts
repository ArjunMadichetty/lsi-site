import { z } from "zod";
import { services } from "@/lib/content";

/** Dropdown options for the quote form. */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "other", label: "Other / Not sure yet" },
];

export const quantityOptions = [
  { value: "prototype", label: "Prototype / 1–10" },
  { value: "low", label: "Low volume / 11–100" },
  { value: "medium", label: "Medium / 101–1,000" },
  { value: "high", label: "High volume / 1,000+" },
  { value: "unsure", label: "Not sure yet" },
];

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

/** Server + client validation for a quote/job submission. */
export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email.").max(200),
  phone: optionalText(40),
  company: optionalText(160),
  service: optionalText(60),
  material: optionalText(160),
  quantity: optionalText(60),
  tolerance: optionalText(80),
  dueDate: optionalText(40),
  message: z
    .string()
    .trim()
    .min(10, "Please add a few details about your part.")
    .max(4000),
  // Honeypot — real users never fill this. Must stay empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const humanizeService = (value?: string) =>
  serviceOptions.find((o) => o.value === value)?.label ?? value ?? "—";

export const humanizeQuantity = (value?: string) =>
  quantityOptions.find((o) => o.value === value)?.label ?? value ?? "—";

/** Upload constraints (kept modest so files can ride along as email attachments). */
export const UPLOAD_MAX_BYTES = 15 * 1024 * 1024; // 15 MB per file
export const UPLOAD_MAX_FILES = 5;
export const UPLOAD_ACCEPT =
  ".pdf,.step,.stp,.stl,.iges,.igs,.dxf,.dwg,.sldprt,.sldasm,.x_t,.x_b,.ipt,.3mf,.zip,.png,.jpg,.jpeg";
