import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdganu.com";

const title = "GDSC ANU — Build, Learn & Connect | October 2026, Canberra";
const description =
  "Join Google Developer Student Club ANU for a flagship developer event in Canberra. Talks, workshops, networking and hands-on sessions across AI, cloud, web and product innovation. ANU Campus, October 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: title,
    template: "%s | GDSC ANU",
  },
  description,
  keywords: [
    "GDSC ANU",
    "Google Developer Student Club ANU",
    "developer event Canberra 2026",
    "GDG ANU",
    "Australian National University tech event",
    "DevFest Canberra",
    "AI workshop Canberra",
    "cloud computing ANU",
    "web development students",
    "tech conference Australia 2026",
    "student developers Canberra",
    "Google developers Australia",
    "software engineering ANU",
    "product innovation workshop",
    "GDSC event 2026",
  ],
  authors: [{ name: "GDSC ANU", url: siteUrl }],
  creator: "GDSC ANU",
  publisher: "Google Developer Student Club ANU",
  category: "technology",

  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "GDSC ANU",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GDSC ANU — Developer Event, October 2026, ANU Canberra",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
    creator: "@gdg_anu",
    site: "@gdg_anu",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Google Developer Student Club ANU",
  alternateName: "GDSC ANU",
  url: siteUrl,
  logo: `${siteUrl}/og-image.png`,
  sameAs: [
    "https://www.instagram.com/gdg_anu/",
    "https://gdg.community.dev/gdg-on-campus-the-australian-national-university-canberra-australia/",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Canberra",
    addressRegion: "ACT",
    postalCode: "2601",
    addressCountry: "AU",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Google Developer Groups",
    url: "https://developers.google.com/community/gdg",
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "GDSC ANU Developer Event 2026",
  description,
  url: siteUrl,
  startDate: "2026-10-01",
  endDate: "2026-10-01",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [`${siteUrl}/og-image.png`],
  location: {
    "@type": "Place",
    name: "Australian National University",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Acton",
      addressLocality: "Canberra",
      addressRegion: "ACT",
      postalCode: "2601",
      addressCountry: "AU",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Google Developer Student Club ANU",
    url: siteUrl,
  },
  offers: {
    "@type": "Offer",
    name: "General Registration",
    url: "https://campus.hellorubric.com/?s=9746",
    price: "0",
    priceCurrency: "AUD",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
  },
  about: [
    { "@type": "Thing", name: "Artificial Intelligence" },
    { "@type": "Thing", name: "Cloud Computing" },
    { "@type": "Thing", name: "Web Development" },
    { "@type": "Thing", name: "Product Innovation" },
  ],
  audience: {
    "@type": "Audience",
    audienceType: "Student developers and technology enthusiasts",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <body className="bg-black text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, eventSchema]),
          }}
        />
        <ThemeProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
