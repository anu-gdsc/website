import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Linkedin, Mic, Sparkles, Users } from "lucide-react";

import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import PageHero from "@/components/layout/page-hero";

type Speaker = {
  name: string;
  role: string;
  company: string;
  bio: string;
  category: string;
  linkedin?: string;
};

const featuredSpeakers: Speaker[] = [
  {
    name: "Aarav Mehta",
    role: "Software Engineer",
    company: "Google",
    category: "Engineering",
    bio: "Works across modern product engineering systems and enjoys helping students think more clearly about building, shipping, and long-term technical growth.",
    linkedin: "#",
  },
  {
    name: "Riya Sharma",
    role: "Product Designer",
    company: "Canva",
    category: "Design",
    bio: "Focuses on product thinking, user experience, and how design decisions shape stronger digital products from idea to execution.",
    linkedin: "#",
  },
];

const allSpeakers: Speaker[] = [
  {
    name: "Aarav Mehta",
    role: "Software Engineer",
    company: "Google",
    category: "Engineering",
    bio: "Works across modern product engineering systems and enjoys helping students think more clearly about building, shipping, and long-term technical growth.",
    linkedin: "#",
  },
  {
    name: "Riya Sharma",
    role: "Product Designer",
    company: "Canva",
    category: "Design",
    bio: "Focuses on product thinking, user experience, and how design decisions shape stronger digital products from idea to execution.",
    linkedin: "#",
  },
  {
    name: "Daniel Lee",
    role: "Cloud Advocate",
    company: "Google Cloud",
    category: "Cloud",
    bio: "Shares practical guidance on cloud systems, developer workflows, and the skills students need to move from learning to real-world execution.",
    linkedin: "#",
  },
  {
    name: "Emily Chen",
    role: "Founder",
    company: "Startup Community",
    category: "Startup",
    bio: "Brings experience from founder communities and early-stage product environments, with a strong focus on action, clarity, and student momentum.",
    linkedin: "#",
  },
  {
    name: "Noah Patel",
    role: "Frontend Engineer",
    company: "Atlassian",
    category: "Web",
    bio: "Interested in frontend systems, accessibility, developer experience, and the craft of building polished digital interfaces that scale.",
    linkedin: "#",
  },
  {
    name: "Sophia Nguyen",
    role: "AI Product Specialist",
    company: "Tech Startup",
    category: "AI",
    bio: "Explores how teams can use AI meaningfully in products, workflows, and experimentation without losing focus on real user value.",
    linkedin: "#",
  },
  {
    name: "James Kim",
    role: "Developer Relations Engineer",
    company: "Open Source Community",
    category: "Community",
    bio: "Passionate about open source, student communities, and helping new developers find confidence through contribution and collaboration.",
    linkedin: "#",
  },
  {
    name: "Olivia Tan",
    role: "Product Manager",
    company: "Canberra Tech",
    category: "Product",
    bio: "Works at the intersection of user needs, execution, and team alignment, with a strong interest in how students can grow into product roles.",
    linkedin: "#",
  },
];

const benefits = [
  {
    icon: Mic,
    title: "A broad mix of perspectives",
    description:
      "Bring together engineers, designers, product thinkers, founders, and community leaders to create a richer event experience.",
  },
  {
    icon: Sparkles,
    title: "Sessions grounded in real practice",
    description:
      "Prioritise speakers who can share practical lessons, useful workflows, and relevant experience rather than generic inspiration.",
  },
  {
    icon: Users,
    title: "Better access for students",
    description:
      "Give attendees opportunities to ask questions, make connections, and learn directly from people working across the industry.",
  },
];

function categoryStyles(category: string) {
  switch (category) {
    case "Engineering":
      return "border border-[#4285F4]/30 bg-[#4285F4]/10 text-[#93C5FD]";
    case "Design":
      return "border border-[#EA4335]/30 bg-[#EA4335]/10 text-[#FCA5A5]";
    case "Cloud":
      return "border border-[#34A853]/30 bg-[#34A853]/10 text-[#9AE6B4]";
    case "AI":
      return "border border-[#FBBC05]/30 bg-[#FBBC05]/10 text-[#FDE68A]";
    case "Web":
      return "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200";
    case "Product":
      return "border border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200";
    case "Startup":
      return "border border-orange-400/30 bg-orange-400/10 text-orange-200";
    case "Community":
      return "border border-white/15 bg-white/5 text-white/75";
    default:
      return "border border-white/15 bg-white/5 text-white/75";
  }
}

function SpeakerCard({ speaker, featured = false }: { speaker: Speaker; featured?: boolean }) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.06] ${
        featured ? "h-full" : ""
      }`}
    >
      <div className="aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03]" />

      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold text-white">{speaker.name}</h3>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles(
              speaker.category
            )}`}
          >
            {speaker.category}
          </span>
        </div>

        <p className="mt-2 text-sm text-white/70">
          {speaker.role} at {speaker.company}
        </p>

        <p className="mt-4 text-sm leading-7 text-white/65">{speaker.bio}</p>

        <div className="mt-5 flex items-center gap-3">
          {speaker.linkedin && (
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SpeakersPage() {
  return (
    <>
      <PageHero
        eyebrow="Speakers"
        title="Meet the people shaping the day."
        description="A curated lineup of engineers, designers, product leaders, founders, and community voices bringing practical insights to students and builders."
      />

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Featured voices"
            title="A strong mix of industry and community experience"
            description="Highlight key speakers early to create trust, energy, and anticipation around the event."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featuredSpeakers.map((speaker) => (
              <SpeakerCard key={speaker.name} speaker={speaker} featured />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Why the lineup matters"
            title="Designed to be relevant, practical, and accessible"
            description="A good speaker lineup is not just about brand names. It is about giving students useful exposure to people, ideas, and paths that feel real."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-black p-6 transition hover:border-white/20 hover:bg-white/[0.03]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-white/75" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="All speakers"
            title="Explore the event lineup"
            description="Use this section to showcase the full speaker list. Later you can replace placeholders with confirmed names, photos, bios, and live profile links."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {allSpeakers.map((speaker) => (
              <SpeakerCard key={speaker.name} speaker={speaker} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <BriefcaseBusiness className="h-5 w-5 text-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Industry insight</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Give students exposure to people actively working across engineering, design,
                product, AI, and startups.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Users className="h-5 w-5 text-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Human conversations</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Keep the lineup approachable so attendees feel encouraged to ask, connect, and
                continue conversations beyond the stage.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Mic className="h-5 w-5 text-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Sessions with substance</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Prioritise people who can teach, demonstrate, and share honest lessons from real
                work rather than only polished talking points.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-black py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.16),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(251,188,5,0.14),transparent_25%)]" />

            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                Next up
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                Explore the schedule and plan your day.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">
                See how the event flows across talks, workshops, networking, and community moments.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  View Schedule
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/register"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Register Interest
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}