import { REGISTER_URL } from "./site";

export type EventCategory = "Flagship" | "Talk" | "Workshop" | "Social";

export type ClubEvent = {
  title: string;
  category: EventCategory;
  /** Shown on the date badge */
  day: string;
  month: string;
  year: string;
  time: string;
  location: string;
  blurb: string;
  status: "upcoming" | "past";
  color: string;
  /** Speaker photo or poster in /public. Falls back to generated art. */
  image?: string;
  speaker?: string;
  href?: string;
};

// Real 2026 events (from the Hellorubric dashboard). Newest first, upcoming on top.
// TODO(content): drop the original posters into /public/events and set `image` on each.
// TODO(content): double-check venues and speaker titles against the posters.
export const events: ClubEvent[] = [
  {
    title: "GDG ANU Developer Event 2026",
    category: "Flagship",
    day: "1",
    month: "Oct",
    year: "2026",
    time: "All day",
    location: "ANU Campus, Acton",
    blurb: "Talks, workshops and networking across AI, cloud, web and product.",
    status: "upcoming",
    color: "#4285F4",
    href: REGISTER_URL,
  },
  {
    title: "Speed Friending",
    category: "Social",
    day: "30",
    month: "Jul",
    year: "2026",
    time: "Evening",
    location: "ANU, Canberra",
    blurb: "Fast, friendly meetups with our friends at AIMSOC.",
    status: "past",
    color: "#EA4335",
  },
  {
    title: "Study Smash",
    category: "Social",
    day: "2",
    month: "Jun",
    year: "2026",
    time: "6:00 to 8:00 pm",
    location: "Hancock Building, West Wing",
    blurb: "A study session with snacks and drinks, co-hosted with Fifty50.",
    status: "past",
    color: "#FBBC05",
  },
  {
    title: "Build an Agentic AI Flutter App",
    category: "Workshop",
    day: "8",
    month: "May",
    year: "2026",
    time: "6:00 to 8:00 pm",
    location: "Marie Reay, MR 4.02",
    blurb: "Hands-on with Suesi Tran, Google Developer Expert. Dinner provided.",
    status: "past",
    color: "#34A853",
    speaker: "Suesi Tran",
  },
  {
    title: "Not Everything Needs an LLM",
    category: "Talk",
    day: "6",
    month: "May",
    year: "2026",
    time: "6:00 pm",
    location: "Science Teaching Building, ANU",
    blurb: "An honest look at when AI helps and when it doesn't, from an AWS Solutions Architect.",
    status: "past",
    color: "#4285F4",
    image: "/speakers/dave.jpeg",
    speaker: "Dave Hall",
  },
  {
    title: "Chaining MCP Servers with Gemini ADK",
    category: "Workshop",
    day: "1",
    month: "May",
    year: "2026",
    time: "6:00 to 8:00 pm",
    location: "Marie Reay, ANU",
    blurb: "Chain MCP servers with the Gemini ADK, led by Lovee Jain. Dinner provided.",
    status: "past",
    color: "#EA4335",
    speaker: "Lovee Jain",
  },
  {
    title: "The Human API: University vs. Reality",
    category: "Talk",
    day: "2",
    month: "Apr",
    year: "2026",
    time: "6:00 pm",
    location: "Science Teaching Building, ANU",
    blurb: "Anupam Phogat on the skills university doesn't teach and how to build them now.",
    status: "past",
    color: "#FBBC05",
    image: "/speakers/anu.png",
    speaker: "Anupam Phogat",
  },
  {
    title: "GDG x AIMSOC Coffee Catchup",
    category: "Social",
    day: "30",
    month: "Mar",
    year: "2026",
    time: "Morning",
    location: "ANU, Canberra",
    blurb: "Coffee and conversation with GDG and AIMSOC members.",
    status: "past",
    color: "#34A853",
  },
  {
    title: "Google Intern Launchpad",
    category: "Talk",
    day: "27",
    month: "Mar",
    year: "2026",
    time: "10:00 to 11:00 am",
    location: "Virtual session",
    blurb: "Technical interview prep, straight from Google engineers.",
    status: "past",
    color: "#4285F4",
  },
  {
    title: "GDG Tech Talks 1",
    category: "Talk",
    day: "26",
    month: "Mar",
    year: "2026",
    time: "6:00 pm",
    location: "Science Teaching Building, ANU",
    blurb: "Harshil Siyani on building multi-agent systems with Google ADK.",
    status: "past",
    color: "#EA4335",
    image: "/speakers/harshil.jpeg",
    speaker: "Harshil Siyani",
  },
];
