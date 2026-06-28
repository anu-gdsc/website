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
    q: "Is GDSC ANU free to attend?",
    a: "Yes, the event is completely free for registered attendees. Spots are limited, so early registration is encouraged to secure your place.",
    order: 1,
  },
  {
    _id: "faq-02",
    _type: "faq",
    q: "Do I need to be an ANU student?",
    a: "While the event is primarily organised for ANU students, all Canberra-based students and tech enthusiasts are welcome to join. The community is open to anyone with curiosity and a desire to learn.",
    order: 2,
  },
  {
    _id: "faq-03",
    _type: "faq",
    q: "Do I need prior coding or tech experience?",
    a: "No prior experience is required. The event is designed to be accessible to complete beginners while also offering genuine depth for more experienced attendees. There is something for everyone.",
    order: 3,
  },
  {
    _id: "faq-04",
    _type: "faq",
    q: "How do I register for the event?",
    a: "Head to the Register page on this website and click the Register Now button. Registration is handled through the Hellorubric platform and takes just a few minutes.",
    order: 4,
  },
  {
    _id: "faq-05",
    _type: "faq",
    q: "What should I bring on the day?",
    a: "A laptop is useful for the hands-on workshop sessions. Otherwise, bring yourself, a curious mindset, and something to take notes with. Everything else will be provided.",
    order: 5,
  },
  {
    _id: "faq-06",
    _type: "faq",
    q: "Will food be provided?",
    a: "Yes — lunch and refreshments will be available for all registered attendees throughout the day, including morning and afternoon breaks.",
    order: 6,
  },
  {
    _id: "faq-07",
    _type: "faq",
    q: "Will sessions be recorded or streamed?",
    a: "We aim to record key sessions where speakers give their permission. Recordings and any post-event resources will be shared through GDSC ANU channels after the event.",
    order: 7,
  },
  {
    _id: "faq-08",
    _type: "faq",
    q: "Is the venue accessible?",
    a: "ANU has accessible facilities. If you have specific accessibility requirements, please reach out to the GDSC ANU team in advance so we can ensure a great experience for you.",
    order: 8,
  },
  {
    _id: "faq-09",
    _type: "faq",
    q: "Can I propose a talk or workshop?",
    a: "We are always open to community-driven session ideas. Reach out via the GDSC ANU Instagram or the GDG community page to start a conversation with the organising team.",
    order: 9,
  },
  {
    _id: "faq-10",
    _type: "faq",
    q: "When will the full schedule be announced?",
    a: "The finalised schedule, including confirmed speaker timings and session details, will be published on this website closer to the event date. Follow our Instagram for updates.",
    order: 10,
  },
];

// ── Speakers ─────────────────────────────────────────────────────────────────
// Note: Images require uploading assets via Sanity Studio.
// Speaker cards will display initials when no image is uploaded.

const speakers = [
  {
    _id: "speaker-01",
    _type: "speaker",
    name: "Sarah Chen",
    role: "Senior ML Engineer",
    company: "Google DeepMind",
    topic: "Building Production-Ready AI Pipelines: From Prototype to Scale",
    bio: "Sarah leads machine learning infrastructure at Google DeepMind, specialising in taking research prototypes into production systems that serve millions of users. She has a passion for developer education and making ML engineering accessible to a broader audience of builders.",
    category: "AI",
    color: "blue",
    linkedin: "#",
    order: 1,
  },
  {
    _id: "speaker-02",
    _type: "speaker",
    name: "Marcus Johnson",
    role: "Cloud Architect",
    company: "Amazon Web Services",
    topic: "Serverless at Scale: Real Patterns from Real Systems",
    bio: "Marcus is a cloud architect at AWS helping enterprise and startup teams design resilient, cost-effective cloud infrastructure. He has spent seven years working across serverless, event-driven, and container-native architectures — and is known for cutting through marketing speak to share what actually works.",
    category: "Cloud",
    color: "green",
    linkedin: "#",
    order: 2,
  },
  {
    _id: "speaker-03",
    _type: "speaker",
    name: "Priya Patel",
    role: "Developer Advocate",
    company: "GitHub",
    topic: "From Consumer to Contributor: Building Your Open Source Identity",
    bio: "Priya works at GitHub helping developers find their footing in the open source world. She spent years making her first contributions before discovering the systems and mindset shifts that accelerated her growth. Today she helps thousands of developers navigate the same journey.",
    category: "Open Source",
    color: "yellow",
    linkedin: "#",
    order: 3,
  },
  {
    _id: "speaker-04",
    _type: "speaker",
    name: "Dr. Emily Robertson",
    role: "Principal Engineer",
    company: "Red Hat",
    topic: "Kubernetes in the Real World: What the Documentation Doesn't Tell You",
    bio: "Emily is a principal engineer at Red Hat with over a decade of experience in container orchestration, distributed systems, and cloud-native tooling. She contributes to open standards and has spoken at KubeCon, GDG DevFest, and developer summits across APAC.",
    category: "Cloud",
    color: "blue",
    linkedin: "#",
    order: 5,
  },
  {
    _id: "speaker-05",
    _type: "speaker",
    name: "James Okafor",
    role: "Lead Frontend Engineer",
    company: "Atlassian",
    topic: "Modern React Patterns for Teams That Actually Ship",
    bio: "James leads frontend architecture at Atlassian, working across Jira and Confluence to build component systems that dozens of product teams rely on daily. He is passionate about design systems, accessibility, and writing frontend code that future developers will thank you for.",
    category: "Web",
    color: "red",
    linkedin: "#",
    order: 6,
  },
  {
    _id: "speaker-06",
    _type: "speaker",
    name: "Alex Kim",
    role: "Group Product Manager",
    company: "Canva",
    topic: "Breaking Into Tech: Non-Linear Paths to Roles You Actually Want",
    bio: "Alex is a Group PM at Canva who started as a graphic design student with zero technical background. Through deliberate skill-building and community involvement, she transitioned into product management at one of Australia's most successful tech companies. She shares the honest, messy, real version of that journey.",
    category: "Career",
    color: "green",
    linkedin: "#",
    order: 7,
  },
  {
    _id: "speaker-07",
    _type: "speaker",
    name: "Liam O'Brien",
    role: "AI Research Engineer",
    company: "Anthropic",
    topic: "Multi-Agent Systems: Building AI That Works Together",
    bio: "Liam researches multi-agent AI architectures at Anthropic, exploring how language model systems can coordinate, communicate, and solve problems collaboratively. His work sits at the intersection of AI safety and practical application — and he brings both perspectives to his talks.",
    category: "AI",
    color: "yellow",
    linkedin: "#",
    order: 8,
  },
  {
    _id: "speaker-08",
    _type: "speaker",
    name: "Nadia Torres",
    role: "Staff Engineer",
    company: "Stripe",
    topic: "API Design That Lasts: Lessons From Building Developer Infrastructure",
    bio: "Nadia is a staff engineer at Stripe focused on the infrastructure that millions of developers build on. She has strong opinions about API design, backwards compatibility, and what it means to treat developers as first-class users. Her sessions are known for being equal parts principled and practical.",
    category: "Web",
    color: "red",
    linkedin: "#",
    order: 9,
  },
];

// ── Run ───────────────────────────────────────────────────────────────────────

async function seed() {
  const allDocs = [...tracks, ...scheduleItems, ...faqs, ...speakers];

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
  console.log(`  ${speakers.length} speakers`);
  console.log("\nOpen Sanity Studio to upload speaker photos:");
  console.log(`  https://sanity.io/manage/personal/project/${projectId}\n`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
