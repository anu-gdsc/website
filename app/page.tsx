import type { Metadata } from "next";
import Hero from "@/components/hero/hero";
import Ticker from "@/components/home/ticker";
import Mission from "@/components/home/mission";
import Events from "@/components/home/events";
import Projects from "@/components/home/projects";
import DinoPlay from "@/components/home/dino-play";
import Community from "@/components/home/community";
import TeamTree from "@/components/home/team-tree";
import Join from "@/components/home/join";
import SponsorsBand from "@/components/home/sponsors-band";
import { getSponsors, getTeamMembers } from "@/sanity/lib/queries";
import { fallbackTeam } from "@/data/team";
import { SITE_URL as siteUrl, SITE_TITLE, SITE_DESCRIPTION, graph, projectsSchema, baseOpenGraph, baseTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    ...baseOpenGraph,
    url: siteUrl,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    ...baseTwitter,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "GDG ANU",
      item: siteUrl,
    },
  ],
};

export default async function Home() {
  const [team, sponsors] = await Promise.all([getTeamMembers(), getSponsors()]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(breadcrumbSchema, projectsSchema)) }}
      />
      <Hero />
      <Ticker />
      <Mission />
      <Events />
      <Projects />
      <Community />
      <TeamTree members={team.length ? team : fallbackTeam} />
      <Join />
      <SponsorsBand sponsors={sponsors} />
      <DinoPlay />
    </>
  );
}
