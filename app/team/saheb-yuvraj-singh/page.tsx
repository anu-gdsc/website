import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/container";
import { PRESIDENT, PRESIDENT_PATH } from "@/data/person";
import { projects } from "@/data/projects";
import { events } from "@/data/events";
import { GDG_COMMUNITY_URL, INSTAGRAM_URL, STATS } from "@/data/site";
import { SITE_URL, graph, personSchema, baseOpenGraph, baseTwitter } from "@/lib/seo";

const url = `${SITE_URL}${PRESIDENT_PATH}`;
const title = `${PRESIDENT.name} | President, GDG ANU (Google Developer Group at ANU)`;
const description = `${PRESIDENT.name} is the President of GDG ANU, the student-run Google Developer Group at the Australian National University in Canberra. See the club's projects, events and team.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { ...baseOpenGraph, type: "profile", url, title, description },
  twitter: { ...baseTwitter, title, description },
};

const breadcrumb = {
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "GDG ANU", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Team", item: `${SITE_URL}/#team` },
    { "@type": "ListItem", position: 3, name: PRESIDENT.name, item: url },
  ],
};

export default function PresidentPage() {
  const recent = events.filter((e) => e.status === "past").slice(0, 4);
  const upcoming = events.find((e) => e.status === "upcoming");

  return (
    <article className="bg-ink pb-24 pt-32 text-white md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(personSchema, breadcrumb)) }}
      />
      <Container>
        <nav aria-label="Breadcrumb" className="label-mono flex flex-wrap items-center gap-2 text-[11px] text-white/45">
          <Link href="/" className="transition hover:text-white">GDG ANU</Link>
          <span>/</span>
          <Link href="/#team" className="transition hover:text-white">Team</Link>
          <span>/</span>
          <span className="text-white/70">{PRESIDENT.name}</span>
        </nav>

        <header className="mt-8 max-w-3xl">
          <p className="label-mono text-white/50">President, Google Developer Group on Campus ANU</p>
          <h1 className="mt-4 text-[clamp(2.6rem,7vw,5rem)] font-medium leading-[1.02] tracking-[-0.035em]">
            <span className="accent-text">{PRESIDENT.name}</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/70">
            {PRESIDENT.name}, also known as Yuvraj, is the President of{" "}
            <Link href="/" className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white">GDG ANU</Link>,
            the student-run Google Developer Group at the Australian National University in Canberra, Australia.
            The club runs tech talks, workshops and real projects, and is led by a volunteer committee across events,
            sponsorships, marketing, people and culture, and tech.
          </p>
          {PRESIDENT.bio && <p className="mt-4 text-lg leading-8 text-white/70">{PRESIDENT.bio}</p>}
        </header>

        <section aria-labelledby="glance" className="mt-16">
          <h2 id="glance" className="text-2xl font-semibold">GDG ANU at a glance</h2>
          <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <dt className="label-mono flex items-center gap-2 text-[10px] text-white/50">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                  {s.label}
                </dt>
                <dd className="mt-3 text-4xl font-medium tracking-tight">{s.value}{s.suffix}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="projects" className="mt-16">
          <h2 id="projects" className="text-2xl font-semibold">Projects the club is building</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {projects.map((p) => (
              <li key={p.name} className="rounded-3xl border border-white/10 bg-ink-2 p-6">
                <h3 className="flex items-center gap-2 text-xl font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                  {p.href?.startsWith("http") ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      {p.name} <ArrowUpRight className="h-4 w-4 text-white/50" />
                    </a>
                  ) : (
                    p.name
                  )}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{p.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="events" className="mt-16">
          <h2 id="events" className="text-2xl font-semibold">Events</h2>
          <ul className="mt-6 space-y-3 text-white/70">
            {upcoming && (
              <li>
                <span className="text-white">{upcoming.title}</span>, {upcoming.month} {upcoming.year}, {upcoming.location}.
              </li>
            )}
            {recent.map((e) => (
              <li key={e.title}>
                <span className="text-white">{e.title}</span>, {e.day} {e.month} {e.year}.
              </li>
            ))}
          </ul>
          <Link href="/#events" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gblue hover:underline">
            See all events <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

        <section aria-labelledby="connect" className="mt-16">
          <h2 id="connect" className="text-2xl font-semibold">Connect</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {[
              { label: "GDG ANU on Instagram", href: INSTAGRAM_URL },
              { label: "GDG ANU on the GDG Community platform", href: GDG_COMMUNITY_URL },
              ...PRESIDENT.sameAs.map((href) => ({ label: href.replace(/^https?:\/\/(www\.)?/, ""), href })),
            ].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium transition hover:border-white/40 hover:bg-white/5"
                >
                  {l.label} <ArrowUpRight className="h-4 w-4 text-white/50" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/#join" className="rounded-full bg-gblue px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">
              Join the GDG ANU committee
            </Link>
            <Link href="/#team" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:bg-white/5">
              Meet the whole team
            </Link>
          </div>
        </section>
      </Container>
    </article>
  );
}
