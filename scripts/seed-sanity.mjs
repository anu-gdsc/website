/**
 * Sanity mock data seed script.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/seed-sanity.mjs
 *
 * Get a write token at: https://sanity.io/manage → project → API → Tokens
 * Select "Editor" (or higher) permissions.
 *
 * This script uses createOrReplace so it's safe to re-run.
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "emgy5zmw";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("Error: SANITY_WRITE_TOKEN is not set.");
  console.error("Get a write token at https://sanity.io/manage");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

// ── Tracks ───────────────────────────────────────────────────────────────────

const tracks = [
  {
    _id: "track-ai-ml",
    _type: "track",
    title: "AI & Machine Learning",
    desc: "Real-world AI applications, machine learning pipelines, and the tools powering the next generation of intelligent systems — from fine-tuning models to deploying them in production.",
    order: 1,
  },
  {
    _id: "track-cloud",
    _type: "track",
    title: "Cloud & Infrastructure",
    desc: "From serverless architectures to Kubernetes — practical cloud engineering concepts that scale from student side-projects to production workloads.",
    order: 2,
  },
  {
    _id: "track-web",
    _type: "track",
    title: "Web & Product Development",
    desc: "Modern frontend patterns, full-stack frameworks, design systems, and the product thinking that turns ideas into shipped, well-loved software.",
    order: 3,
  },
  {
    _id: "track-career",
    _type: "track",
    title: "Career & Open Source",
    desc: "Navigate non-linear career paths, contribute meaningfully to open source, and build the habits and skills that matter beyond the classroom.",
    order: 4,
  },
];

// ── Schedule ─────────────────────────────────────────────────────────────────

const scheduleItems = [
  {
    _id: "schedule-01",
    _type: "scheduleItem",
    time: "8:30 AM",
    title: "Registration & Arrival",
    desc: "Collect your badge, grab a coffee, and meet fellow attendees before the day kicks off.",
    type: "Arrival",
    order: 1,
  },
  {
    _id: "schedule-02",
    _type: "scheduleItem",
    time: "9:00 AM",
    title: "Welcome & Opening Keynote",
    desc: "GDSC ANU organisers open the day with a high-energy welcome, a look at the community mission, and a preview of what to expect across the sessions ahead.",
    type: "Keynote",
    order: 2,
  },
  {
    _id: "schedule-03",
    _type: "scheduleItem",
    time: "9:45 AM",
    title: "Session 1 — AI & Machine Learning",
    desc: "A deep dive into production-grade AI pipelines: model selection, evaluation, deployment patterns, and the real-world tradeoffs engineers face when shipping AI products.",
    type: "Talks",
    order: 3,
  },
  {
    _id: "schedule-04",
    _type: "scheduleItem",
    time: "10:30 AM",
    title: "Morning Networking Break",
    desc: "A structured break to connect with peers, grab refreshments, and explore sponsor tables before the next session block.",
    type: "Networking",
    order: 4,
  },
  {
    _id: "schedule-05",
    _type: "scheduleItem",
    time: "11:00 AM",
    title: "Session 2 — Cloud & Infrastructure",
    desc: "Practical cloud architecture patterns that actually work at scale — from serverless functions and managed databases to container orchestration and cost-aware design.",
    type: "Talks",
    order: 5,
  },
  {
    _id: "schedule-06",
    _type: "scheduleItem",
    time: "11:45 AM",
    title: "Workshop — Hands-On with AI APIs",
    desc: "An interactive hands-on session exploring the latest AI developer tools and APIs. Attendees leave with working code and a practical understanding of integrating LLMs into real applications.",
    type: "Workshop",
    order: 6,
  },
  {
    _id: "schedule-07",
    _type: "scheduleItem",
    time: "12:30 PM",
    title: "Lunch & Community Mixer",
    desc: "Lunch break with organised networking, community tables by interest area, and informal conversations with speakers, organisers, and fellow attendees.",
    type: "Networking",
    order: 7,
  },
  {
    _id: "schedule-08",
    _type: "scheduleItem",
    time: "1:30 PM",
    title: "Session 3 — Web & Open Source",
    desc: "From modern full-stack patterns to meaningful open source contribution — two practitioners share what it actually looks like to ship real software and give back to the ecosystem.",
    type: "Talks",
    order: 8,
  },
  {
    _id: "schedule-09",
    _type: "scheduleItem",
    time: "2:15 PM",
    title: "Workshop — Build & Ship",
    desc: "A practical workshop where attendees prototype a mini-project using current developer toolchains. Bring a laptop. Leave with something working.",
    type: "Workshop",
    order: 9,
  },
  {
    _id: "schedule-10",
    _type: "scheduleItem",
    time: "3:00 PM",
    title: "Afternoon Break & Sponsor Showcase",
    desc: "Refreshments and an opportunity to explore partner booths, community tables, and catch up with any speakers you missed earlier in the day.",
    type: "Networking",
    order: 10,
  },
  {
    _id: "schedule-11",
    _type: "scheduleItem",
    time: "3:30 PM",
    title: "Panel — Career Paths & Industry Realities",
    desc: "A candid panel discussion with industry practitioners about non-linear career paths, the skills that actually matter, and what student developers should prioritise right now.",
    type: "Discussion",
    order: 11,
  },
  {
    _id: "schedule-12",
    _type: "scheduleItem",
    time: "4:30 PM",
    title: "Closing Keynote & Community Wrap",
    desc: "The day closes with key takeaways, community shoutouts, and a look at what comes next for GDSC ANU — including upcoming chapter events and collaboration opportunities.",
    type: "Keynote",
    order: 12,
  },
  {
    _id: "schedule-13",
    _type: "scheduleItem",
    time: "5:00 PM",
    title: "Event Close & Informal Networking",
    desc: "The official program ends, but the conversations continue. Stick around, exchange details, and keep the momentum going.",
    type: "Closing",
    order: 13,
  },
];

// ── FAQs ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    _id: "faq-01",
    _type: "faq",
    q: "What is GDSC ANU?",
    a: "Google Developer Student Clubs ANU is a student-run community at the Australian National University. We run regular talks, workshops, and networking events covering AI, cloud, open source, and software development — bringing together students and industry practitioners throughout the year.",
    order: 1,
  },
  {
    _id: "faq-02",
    _type: "faq",
    q: "Are events free to attend?",
    a: "Yes, all GDSC ANU events are completely free. We believe access to quality technical education and industry connections shouldn't cost anything. Spots can fill up, so registering early is always a good idea.",
    order: 2,
  },
  {
    _id: "faq-03",
    _type: "faq",
    q: "Do I need to be an ANU student?",
    a: "Not at all. While we're based at ANU, our events are open to all Canberra-area students and anyone with an interest in tech. We regularly see attendees from UC, CIT, and beyond.",
    order: 3,
  },
  {
    _id: "faq-04",
    _type: "faq",
    q: "Do I need a technical background to come?",
    a: "No. Our events are designed to be welcoming to people at every stage — whether you're in your first semester of CS, studying something completely unrelated, or already working in industry. The speakers pitch for curiosity, not credentials.",
    order: 4,
  },
  {
    _id: "faq-05",
    _type: "faq",
    q: "How do I find out about upcoming events?",
    a: "Follow us on Instagram @gdsc.anu for announcements, speaker reveals, and event recaps. You can also register interest on this site and we'll reach out when new events go live.",
    order: 5,
  },
  {
    _id: "faq-06",
    _type: "faq",
    q: "How do I register for an event?",
    a: "Each event has its own registration link shared on our Instagram and on the Hellorubric platform. Head to the Register page on this site for the current open event, or follow our socials to catch the next one when it opens.",
    order: 6,
  },
  {
    _id: "faq-07",
    _type: "faq",
    q: "Are sessions recorded?",
    a: "We record sessions when speakers are happy for us to do so. Recaps and any available recordings get shared through our Instagram after each event — it's worth following even if you can't make it on the day.",
    order: 7,
  },
  {
    _id: "faq-08",
    _type: "faq",
    q: "Can I speak at a GDSC ANU event?",
    a: "Yes — we're always interested in hearing from practitioners with something real to share. Reach out to us via Instagram or through the GDG Community platform to start a conversation. We particularly value talks grounded in hands-on experience.",
    order: 8,
  },
  {
    _id: "faq-09",
    _type: "faq",
    q: "How can I get involved as an organiser or volunteer?",
    a: "We open organiser applications at the start of each ANU academic year. Keep an eye on our Instagram for announcements. If you want to get on our radar early, come to a few events and introduce yourself to the team.",
    order: 9,
  },
  {
    _id: "faq-10",
    _type: "faq",
    q: "Is GDSC ANU officially affiliated with Google?",
    a: "Yes. GDSC ANU is an official Google Developer Student Club, part of the global GDG (Google Developer Groups) network. We operate independently as a student committee at ANU but are supported and recognised by Google.",
    order: 10,
  },
];

// ── Speakers ─────────────────────────────────────────────────────────────────
// Real confirmed speakers from the GDSC ANU speaker pipeline.
// Add LinkedIn URLs and upload photos in Sanity Studio.

const speakers = [
  {
    _id: "speaker-harshill",
    _type: "speaker",
    name: "Harshill Siyani",
    role: "Software Engineer",
    company: "News Corp Australia",
    topic: "Develop Multi-Agent Systems with Google ADK",
    bio: "Harshill is a software engineer at News Corp Australia and the founder of Siyani AI. He brought a practical, hands-on session on building multi-agent systems using Google's Agent Development Kit — breaking down how real-world agentic architectures are designed, wired together, and shipped.",
    category: "AI",
    color: "blue",
    order: 1,
  },
  {
    _id: "speaker-anupam",
    _type: "speaker",
    name: "Anupam Pattnaik",
    role: "CEO & Co-Founder",
    company: "CoreX",
    topic: "The \"Human API\": Why Your University Degree is as Important as Your IDE",
    bio: "Anupam is the CEO and co-founder of CoreX, an AI company building tools for professionals. His talk tackled the gap between what universities teach and what industry actually rewards — making the case that the soft skills and mindset you build at uni are often the real differentiator in a career.",
    category: "Career",
    color: "yellow",
    order: 2,
  },
  {
    _id: "speaker-dave-hall",
    _type: "speaker",
    name: "Dave Hall",
    role: "Solutions Architect",
    company: "Amazon Web Services",
    topic: "Not Everything Needs an LLM",
    bio: "Dave is a solutions architect at AWS with deep experience across cloud infrastructure and AI systems. His talk was a refreshing counterpoint to the AI hype cycle — a practical guide to knowing when a large language model is the right tool, and when a simpler approach will do the job better and cheaper.",
    category: "Cloud",
    color: "green",
    order: 3,
  },
  {
    _id: "speaker-lovee-jain",
    _type: "speaker",
    name: "Lovee Jain",
    role: "Google Developer Expert",
    company: "GDE — AI / ML",
    topic: "Chaining MCP Servers with Gemini ADK",
    bio: "Lovee is a Google Developer Expert in AI and ML, and one of the most active voices in the Gemini developer ecosystem. Her session went deep on chaining Model Context Protocol servers with the Gemini ADK — a practical walkthrough of how to wire up complex agentic pipelines without losing your mind.",
    category: "AI",
    color: "blue",
    order: 4,
  },
  {
    _id: "speaker-suesi-tran",
    _type: "speaker",
    name: "Suesi Tran",
    role: "Google Developer Expert",
    company: "GDE — Flutter & Dart",
    topic: "Agentic AI in Your Flutter App",
    bio: "Suesi is a Google Developer Expert in Flutter and Dart, and a developer passionate about bringing AI capabilities into mobile experiences. Her session showed how to integrate agentic AI patterns directly into Flutter apps — with a deep dive on the architectural decisions that make these features feel native, not bolted on.",
    category: "AI",
    color: "red",
    order: 5,
  },
];

// ── Team Members ──────────────────────────────────────────────────────────────
// Placeholder names from your org chart. Replace with real names/links before running.
// Photos can't be seeded via script — upload them in Sanity Studio.

const teamMembers = [
  // Leadership
  { _id: "team-yuvraj",    _type: "teamMember", name: "Yuvraj",           role: "President",      department: "leadership", order: 1 },
  { _id: "team-sam",       _type: "teamMember", name: "Sam",              role: "Secretary",      department: "leadership", order: 2 },
  { _id: "team-ally",      _type: "teamMember", name: "Ally",             role: "Secretary",      department: "leadership", order: 3 },
  { _id: "team-will",      _type: "teamMember", name: "Will",             role: "Treasurer",      department: "leadership", order: 4 },
  { _id: "team-pranav",    _type: "teamMember", name: "Pranav",           role: "VP Projects",    department: "leadership", order: 5 },
  { _id: "team-boris",     _type: "teamMember", name: "Boris",            role: "VP Projects",    department: "leadership", order: 6 },

  // Operations
  { _id: "team-marketing", _type: "teamMember", name: "Marketing Lead",   role: "Marketing",       department: "operations", order: 1 },
  { _id: "team-pc",        _type: "teamMember", name: "P&C Lead",         role: "People & Culture",department: "operations", order: 2 },
  { _id: "team-sponsors",  _type: "teamMember", name: "Sponsorships Lead",role: "Sponsorships",    department: "operations", order: 3 },
  { _id: "team-events",    _type: "teamMember", name: "Events Lead",      role: "Events",          department: "operations", order: 4 },

  // Projects
  { _id: "team-pm",        _type: "teamMember", name: "Project Manager",  role: "Project Manager", department: "projects",   order: 1 },
  { _id: "team-consult",   _type: "teamMember", name: "Consultant",       role: "Consultant",      department: "projects",   order: 2 },
];

// ── Run ───────────────────────────────────────────────────────────────────────

async function seed() {
  const allDocs = [...tracks, ...scheduleItems, ...faqs, ...speakers, ...teamMembers];

  console.log(`\nSeeding ${allDocs.length} documents to ${projectId}/${dataset}...\n`);

  const transaction = client.transaction();
  for (const doc of allDocs) {
    transaction.createOrReplace(doc);
  }

  await transaction.commit();

  console.log("Done!\n");
  console.log(`  ${tracks.length} tracks`);
  console.log(`  ${scheduleItems.length} schedule items`);
  console.log(`  ${faqs.length} FAQs`);
  console.log(`  ${speakers.length} speakers (real pipeline)`);

  console.log(`  ${teamMembers.length} team members`);
  console.log("\nOpen Sanity Studio to update names, add photos, and social links:");
  console.log(`  https://sanity.io/manage/personal/project/${projectId}\n`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
