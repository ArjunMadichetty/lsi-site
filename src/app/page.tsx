import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { CapabilitiesBand } from "@/components/sections/capabilities-band";
import { WhyLsi } from "@/components/sections/why-lsi";
import { Process } from "@/components/sections/process";
import { Industries } from "@/components/sections/industries";
import { CtaBand } from "@/components/sections/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <CapabilitiesBand />
      <WhyLsi />
      <Process />
      <Industries />
      <CtaBand />
    </>
  );
}
