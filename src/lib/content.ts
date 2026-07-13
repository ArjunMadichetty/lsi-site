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
    title: "CNC & Manual Milling",
    short: "Haas CNC machining centers plus a manual Bridgeport mill.",
    description:
      "Haas CNC vertical machining centers produce precise, repeatable milled parts from prototype through production, while a manual Bridgeport mill handles fixtures, modifications, and quick short-run work — from simple brackets to complex machined housings.",
    bullets: [
      "3-axis CNC milling (Haas VMCs)",
      "Manual milling (Bridgeport, DRO)",
      "Tolerances to ±0.0005\"",
      "Metals & plastics",
    ],
  },
  {
    slug: "cnc-turning",
    title: "CNC & Manual Turning",
    short: "CNC mill-turn lathe plus a manual engine lathe.",
    description:
      "Our CNC mill-turn lathe finishes round parts complete — turning with milled features in a single setup — while a manual engine lathe handles quick one-offs, rework, and repairs. Precision shafts, bushings, fittings, and threaded components.",
    bullets: [
      "CNC mill-turn lathe",
      "Manual engine lathe",
      "Shafts, bushings & fittings",
      "One-offs, rework & production",
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
    slug: "welding-fabrication",
    title: "MIG Welding & Fabrication",
    short: "In-house MIG welding for weldments and assemblies.",
    description:
      "In-house MIG welding and fabrication lets us join, build up, and assemble weldments without sending work to an outside vendor — keeping your parts, quality, and lead times under one roof. Welded and machined complete.",
    bullets: [
      "In-house MIG welding",
      "Weldments & fabricated assemblies",
      "Steel & aluminum",
      "Welded + machined complete",
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
  { label: "CNC vertical mills", value: "2× Haas", note: "3-axis machining centers" },
  { label: "Turning", value: "CNC + Manual", note: "mill-turn & engine lathe" },
  { label: "In-house welding", value: "MIG", note: "weld & fabricate" },
  { label: "Tightest tolerance", value: "±0.0005\"", note: "on precision features" },
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
  { value: "±0.0005\"", label: "Tolerances held in production" },
  { value: "50+", label: "Materials machined" },
  { value: "98%", label: "On-time delivery" },
];

export const differentiators: { title: string; description: string }[] = [
  { title: "Quality you can document", description: "In-process and final inspection with CMM verification, first-article reports, and full material traceability on request." },
  { title: "Engineering that saves you money", description: "DFM feedback on every quote helps reduce cost and lead time before a single chip is cut." },
  { title: "On-time, every time", description: "Predictable scheduling, stocking programs, and lights-out capacity keep your line running." },
  { title: "One shop, complete parts", description: "CNC & manual milling, turning, MIG welding, finishing, and assembly under one roof — fewer vendors, tighter control." },
];

export type Machine = {
  name: string;
  tag: string;
  description: string;
  specs: string[];
  samples: string;
};

/**
 * The shop floor. TODO(client): confirm exact makes, models, counts, and travels
 * once the owner sends the real machine list.
 */
export const machines: Machine[] = [
  {
    name: "Haas CNC Vertical Mills",
    tag: "2 machines · 3-axis VMC",
    description:
      "Our workhorse Haas vertical machining centers run tight-tolerance milled parts from prototype through production — brackets, housings, plates, and manifolds.",
    specs: [
      "3-axis CNC milling",
      "Prototype & production runs",
      "Metals & engineering plastics",
      "Repeatable, in-process inspected",
    ],
    samples: "Brackets · housings · manifolds · plates",
  },
  {
    name: "CNC Mill-Turn Lathe",
    tag: "Turning + milling",
    description:
      "A CNC turning center that finishes round parts complete — turning with milled features in a single setup for shafts, bushings, and fittings.",
    specs: [
      "CNC turning",
      "Milled features in one setup",
      "Threading, boring & grooving",
      "Short & long runs",
    ],
    samples: "Shafts · bushings · threaded fittings",
  },
  {
    name: "Manual Engine Lathe",
    tag: "Manual turning",
    description:
      "For quick turned parts, rework, and one-offs, a manual lathe is often the fastest path to a finished part — facing, boring, and threading on demand.",
    specs: ["Manual turning", "Fast one-offs & rework", "Facing, boring & threading", "Repairs & modifications"],
    samples: "One-offs · rework · repairs",
  },
  {
    name: "Bridgeport Manual Mill",
    tag: "Knee mill · DRO",
    description:
      "The classic Bridgeport knee mill handles fixtures, modifications, and short-run parts that don't call for full CNC — with a digital readout for accuracy.",
    specs: ["Manual milling", "Digital readout (DRO)", "Fixtures & modifications", "Short-run parts"],
    samples: "Fixtures · modifications · short runs",
  },
  {
    name: "MIG Welding & Fabrication",
    tag: "In-house welding",
    description:
      "In-house MIG welding lets us join, build up, and fabricate weldments and assemblies without an outside vendor — keeping quality and lead time under our control, then machining welded parts complete.",
    specs: ["MIG welding", "Weldments & assemblies", "Steel & aluminum", "Weld + machine complete"],
    samples: "Weldments · frames · brackets · assemblies",
  },
];
