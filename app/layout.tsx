import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SITE_URL as siteUrl, SITE_TITLE as title, SITE_DESCRIPTION as description, SITE_NAME, graph, organizationSchema, websiteSchema, personSchema } from "@/lib/seo";
import ClickBurst from "@/components/fx/click-burst";
import ScrollProgress from "@/components/fx/scroll-progress";
import RoamingDino from "@/components/fx/roaming-dino";
import CommandPalette from "@/components/fx/command-palette";

const googleSans = Google_Sans({
  subsets: ["latin"],
  variable: "--font-google",
  display: "swap",
});

const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-google-code",
  display: "swap",
  weight: ["400", "500", "600"],
});



export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: title,
    template: "%s | GDG ANU",
  },
  description,
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  keywords: [
    "GDG ANU",
    "GDG on Campus ANU",
    "Google Developer Group ANU",
    "Google Developer Group Australian National University",
    "GDSC ANU",
    "ANU tech club",
    "ANU coding club",
    "ANU student projects",
    "Canberra developer community",
    "AskANU",
    "ANU Info",
    "Access ANU",
    "Sign Sense",
    "Saheb Yuvraj Singh",
    "Yuvraj GDG ANU",
    "GDG ANU president",
    "Google developers Australia",
    "student developers Canberra",
    "tech talks ANU",
    "AI workshop Canberra",
  ],
  authors: [{ name: "GDG ANU", url: siteUrl }, { name: "Saheb Yuvraj Singh", url: `${siteUrl}/team/saheb-yuvraj-singh` }],
  creator: "GDG ANU",
  applicationName: SITE_NAME,
  publisher: "Google Developer Group ANU",
  category: "technology",

  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "GDG ANU",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GDG ANU Developer Event, October 2026, ANU Canberra",
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

  // Paste the Google Search Console HTML-tag token into NEXT_PUBLIC_GSC_VERIFICATION (Vercel env var).
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

const eventSchema = {
  "@type": "Event",
  name: "GDG ANU Developer Event 2026",
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
  organizer: { "@id": `${siteUrl}/#organization` },
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
    <html lang="en-AU" suppressHydrationWarning className={`${googleSans.variable} ${googleSansCode.variable}`}>
      <body className="bg-ink text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graph(organizationSchema, websiteSchema, personSchema, eventSchema)),
          }}
        />
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <RoamingDino />
          <CommandPalette />
          <ClickBurst />
        </ThemeProvider>
      </body>
    </html>
  );
}
