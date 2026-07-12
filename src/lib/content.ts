/**
 * Marketing content for LSI. Editable, plain-data source of truth so copy can
 * be updated without touching component code.
 *
 * TODO(client): Review copy, machine list, tolerances, and certifications for
 * accuracy against the shop's actual capabilities.
 */

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "cnc-milling",
    title: "CNC Milling",
    short: "3-, 4-, and 5-axis milling for complex geometries.",
    description:
      "Multi-axis vertical and horizontal machining centers produce complex, tight-tolerance parts from prototype through production. From simple brackets to intricate 5-axis contours, we hold demanding specs run after run.",
    bullets: [
      "3-, 4- & simultaneous 5-axis milling",
      "Tolerances to ±0.0002\"",
      "Envelopes up to 40\" × 20\" × 25\"",
      "Aluminum, steel, stainless, titanium & plastics",
    ],
  },
  {
    slug: "cnc-turning",
    title: "CNC Turning",
    short: "Live-tooling lathes for precision turned components.",
    description:
      "CNC lathes with live tooling and bar feeders turn precision shafts, bushings, fittings, and threaded components. Mill-turn capability lets us finish complex parts complete in a single setup.",
    bullets: [
      "Multi-axis mill-turn centers",
      "Bar capacity up to 3\" diameter",
      "Live tooling & sub-spindle",
      "High-volume, lights-out production",
    ],
  },
  {
    slug: "prototyping",
    title: "Rapid Prototyping",
    short: "First articles and iterations in days, not weeks.",
    description:
      "Fast, accurate prototypes machined from your production material so you validate form, fit, and function before committing to a run. Engineering support helps optimize designs for manufacturability.",
    bullets: [
      "Quick-turn first articles",
      "DFM feedback on every quote",
      "Same-material prototypes",
      "Seamless scale to production",
    ],
  },
  {
    slug: "production",
    title: "Production Runs",
    short: "Repeatable, documented volume manufacturing.",
    description:
      "Scalable production with process controls, in-process inspection, and full documentation. Kanban, scheduled releases, and stocking programs keep your line supplied and your lead times predictable.",
    bullets: [
      "Short and long production runs",
      "SPC & in-process inspection",
      "Stocking & scheduled releases",
      "Consistent, documented quality",
    ],
  },
  {
    slug: "finishing-assembly",
    title: "Finishing & Assembly",
    short: "Turnkey finishing, hardware, and assembly.",
    description:
      "We manage anodizing, plating, powder coat, passivation, heat treat, and more through vetted partners — then deliver assembled, marked, and packaged parts ready to install.",
    bullets: [
      "Anodize, plate, passivate, powder coat",
      "Heat treat & black oxide",
      "Laser engraving & marking",
      "Kitting, assembly & packaging",
    ],
  },
  {
    slug: "inspection-quality",
    title: "Inspection & Quality",
    short: "CMM-verified parts with full documentation.",
    description:
      "A climate-controlled inspection lab with CMM and precision gaging verifies your parts to print. First-article (AS9102), PPAP, and material certs available on request.",
    bullets: [
      "CMM & precision gaging",
      "First-article (AS9102) reports",
      "PPAP & material certifications",
      "Full traceability & documentation",
    ],
  },
];

export type Capability = { label: string; value: string; note?: string };

export const capabilities: Capability[] = [
  { label: "Tightest tolerance", value: "±0.0002\"", note: "on precision features" },
  { label: "Max part envelope", value: "40 × 20 × 25\"", note: "5-axis milling" },
  { label: "Max turned diameter", value: "3.0\"", note: "bar feed" },
  { label: "Axes", value: "3 · 4 · 5", note: "simultaneous milling" },
];

export const materials: string[] = [
  "Aluminum (6061, 7075, MIC-6)",
  "Stainless (303, 304, 316, 17-4)",
  "Carbon & alloy steel",
  "Titanium",
  "Brass & copper",
  "Inconel & superalloys",
  "Delrin / acetal",
  "PEEK, PTFE & Ultem",
  "Nylon, ABS & polycarbonate",
];

export type Industry = { name: string; description: string };

export const industries: Industry[] = [
  { name: "Aerospace & Defense", description: "Flight- and mission-critical components held to exacting specs with full traceability." },
  { name: "Medical & Dental", description: "Biocompatible, tight-tolerance parts and instruments with documented quality." },
  { name: "Robotics & Automation", description: "Precision structural and motion components for automated systems." },
  { name: "Semiconductor", description: "High-purity, ultra-precise parts for equipment and tooling." },
  { name: "Energy & Oil/Gas", description: "Durable components engineered for demanding field environments." },
  { name: "Industrial Equipment", description: "Reliable machined parts for OEM machinery and capital equipment." },
];

export type Step = { n: string; title: string; description: string };

export const processSteps: Step[] = [
  { n: "01", title: "Upload & Quote", description: "Send your CAD or drawings. We review for manufacturability and return a detailed quote — fast." },
  { n: "02", title: "Engineering & DFM", description: "Our team confirms specs, materials, and finishes, flagging any cost or lead-time optimizations." },
  { n: "03", title: "Precision Machining", description: "Your parts are machined on calibrated equipment with in-process inspection at every step." },
  { n: "04", title: "Inspect & Ship", description: "Final CMM inspection, documentation, and careful packaging — delivered on schedule." },
];

export const stats: { value: string; label: string }[] = [
  { value: "25+", label: "Years machining precision parts" },
  { value: "±0.0002\"", label: "Tolerances held in production" },
  { value: "50+", label: "Materials machined" },
  { value: "98%", label: "On-time delivery" },
];

export const differentiators: { title: string; description: string }[] = [
  { title: "Quality you can document", description: "In-process and final inspection with CMM verification, first-article reports, and full material traceability on request." },
  { title: "Engineering that saves you money", description: "DFM feedback on every quote helps reduce cost and lead time before a single chip is cut." },
  { title: "On-time, every time", description: "Predictable scheduling, stocking programs, and lights-out capacity keep your line running." },
  { title: "One shop, complete parts", description: "Milling, turning, finishing, and assembly under one roof — fewer vendors, tighter control." },
];
