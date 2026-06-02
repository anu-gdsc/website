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
import { getSpeakers, getSponsors, getScheduleItems, getFaqs, getTracks } from "@/sanity/lib/queries";

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

export default async function Home() {
  const [speakers, sponsors, scheduleItems, faqs, tracks] = await Promise.all([
    getSpeakers(),
    getSponsors(),
    getScheduleItems(),
    getFaqs(),
    getTracks(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Hero />
      <Stats />
      <About />
      <Tracks tracks={tracks} />
      <Speakers speakers={speakers} />
      <Schedule items={scheduleItems} />
      <Sponsors sponsors={sponsors} />
      <FAQ faqs={faqs} />
      <RegisterCTA />
    </>
  );
}
