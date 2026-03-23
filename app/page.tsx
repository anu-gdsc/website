import Hero from "@/components/hero/hero";
import Stats from "@/components/sections/stats";
import About from "@/components/sections/about";
import Tracks from "@/components/sections/tracks";
import Speakers from "@/components/sections/speakers";
import Schedule from "@/components/sections/schedule";
import Sponsors from "@/components/sections/sponsors";
import FAQ from "@/components/sections/faq";
import RegisterCTA from "@/components/sections/register-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Tracks />
      <Speakers />
      <Schedule />
      <Sponsors />
      <FAQ />
      <RegisterCTA />
    </>
  );
}