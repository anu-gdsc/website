import { PRESIDENT, PRESIDENT_PATH } from "@/data/person";
import { projects } from "@/data/projects";
import { GDG_COMMUNITY_URL, INSTAGRAM_URL } from "@/data/site";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdganu.com";
export const SITE_NAME = "GDG ANU";
export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}${PRESIDENT_PATH}#person`;

export const SITE_TITLE = "GDG ANU | Google Developer Group at the Australian National University";
export const SITE_DESCRIPTION =
  "GDG ANU is the student-run Google Developer Group at the Australian National University in Canberra. Tech talks, workshops and projects like AskANU and Sign Sense, and a committee you can join.";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "GDG ANU, the Google Developer Group at the Australian National University",
} as const;

/** Page-level metadata replaces (not merges) the layout's, so pages spread these to keep the share card intact. */
export const baseOpenGraph = {
  type: "website" as const,
  siteName: SITE_NAME,
  locale: "en_AU",
  images: [OG_IMAGE],
};
export const baseTwitter = {
  card: "summary_large_image" as const,
  images: ["/og-image.png"],
  creator: "@gdg_anu",
  site: "@gdg_anu",
};

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Google Developer Group on Campus, Australian National University",
  alternateName: ["GDG ANU", "GDG on Campus ANU", "Google Developer Group ANU", "GDSC ANU"],
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
  image: `${SITE_URL}/og-image.png`,
  description: SITE_DESCRIPTION,
  sameAs: [INSTAGRAM_URL, GDG_COMMUNITY_URL],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Canberra",
    addressRegion: "ACT",
    postalCode: "2601",
    addressCountry: "AU",
  },
  areaServed: "Canberra, Australia",
  knowsAbout: ["Google technologies", "Artificial intelligence", "Cloud computing", "Web development", "Flutter", "Student software projects"],
  member: { "@id": PERSON_ID },
  parentOrganization: {
    "@type": "Organization",
    name: "Google Developer Groups",
    url: "https://developers.google.com/community/gdg",
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: ["Google Developer Group ANU", "GDG on Campus ANU"],
  description: SITE_DESCRIPTION,
  inLanguage: "en-AU",
  publisher: { "@id": ORG_ID },
};

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: PRESIDENT.name,
  alternateName: [...PRESIDENT.alternateNames],
  jobTitle: PRESIDENT.jobTitle,
  url: `${SITE_URL}${PRESIDENT_PATH}`,
  worksFor: { "@id": ORG_ID },
  affiliation: { "@id": ORG_ID },
  ...(PRESIDENT.bio ? { description: PRESIDENT.bio } : {}),
  ...(PRESIDENT.sameAs.length ? { sameAs: [...PRESIDENT.sameAs] } : {}),
};

/** The club's projects as structured data, so they can surface for searches like "AskANU" or "Sign Sense". */
export const projectsSchema = {
  "@type": "ItemList",
  "@id": `${SITE_URL}/#projects`,
  name: "GDG ANU projects",
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: p.href?.startsWith("http")
      ? {
          "@type": "WebApplication",
          name: p.name,
          alternateName: p.name === "ANU Info" ? "AskANU" : undefined,
          url: p.href,
          description: p.blurb,
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          creator: { "@id": ORG_ID },
        }
      : {
          "@type": "CreativeWork",
          name: p.name,
          description: p.blurb,
          creator: { "@id": ORG_ID },
        },
  })),
};

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
