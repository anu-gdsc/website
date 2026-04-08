import type { Metadata } from "next";
import Hero from "@/components/hero/hero";
import Stats from "@/components/sections/stats";
import About from "@/components/sections/about";
import Tracks from "@/components/sections/tracks";
import Speakers from "@/components/sections/speakers";
import Schedule from "@/components/sections/schedule";
import Sponsors from "@/components/sections/sponsors";
import FAQ from "@/components/sections/faq";
import RegisterCTA from "@/components/sections/register-cta";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdganu.com";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    url: siteUrl,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "GDSC ANU",
      item: siteUrl,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
