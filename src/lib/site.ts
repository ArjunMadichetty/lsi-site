/**
 * Central site configuration for LSI.
 *
 * TODO(client): Replace the PLACEHOLDER values below with the shop's real
 * details. The owner will provide a phone number, email address, and the full
 * company name — update `phone`, `email`, and `legalName` when they arrive.
 */
export const site = {
  name: "LSI",
  // TODO(client): confirm the full/legal company name.
  legalName: "LSI Manufacturing",
  tagline: "Precision CNC Machining & Manufacturing",
  description:
    "LSI is a precision CNC manufacturing shop delivering tight-tolerance machined parts, prototypes, and production runs. Request a quote and get parts made right, on time.",
  url: "https://lsi-manufacturing.com", // TODO(client): production domain

  // --- Contact ---
  phone: "(770) 841-7096",
  phoneHref: "tel:+17708417096",
  email: "quotes@lsi-manufacturing.com", // TODO(client) — confirm real email
  address: {
    line1: "000 Industrial Parkway", // TODO(client)
    line2: "",
    city: "City",
    state: "ST",
    zip: "00000",
  },
  hours: "Mon–Fri, 7:00 AM – 5:00 PM",

  // Where the quote/contact form notifications are delivered.
  // These drive DB + email + SMS. Server reads real values from env vars.
  notify: {
    email: "quotes@lsi-manufacturing.com", // TODO(client) — overridden by SHOP_NOTIFICATION_EMAIL
    phone: "+17708417096", // overridden by SHOP_NOTIFICATION_PHONE
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Capabilities", href: "/capabilities" },
    { label: "Industries", href: "/industries" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as const,

  cta: { label: "Request a Quote", href: "/quote" },
  contactCta: { label: "Contact Us", href: "/contact" },
} as const;

export type SiteConfig = typeof site;
