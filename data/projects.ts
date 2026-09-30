export type Project = {
  name: string;
  blurb: string;
  tags: string[];
  status: "Live" | "In progress" | "Coming soon";
  color: string;
  /** Which generated mock-up to show when there is no screenshot */
  art: "map" | "chat" | "vision";
  /** Screenshot in /public/projects (16:10 works best) */
  image?: string;
  /** Live link. Shows a "Try it" prompt on the card. */
  href?: string;
};

// The club's three current projects.
// TODO(content): confirm the one-line description for Access ANU (written from the name),
// and add a screenshot in /public/projects when ready.
export const projects: Project[] = [
  {
    name: "Access ANU",
    blurb: "Tools that make ANU campus life more accessible for every student.",
    tags: [],
    status: "In progress",
    color: "#4285F4",
    art: "map",
  },
  {
    name: "ANU Info",
    blurb: "AskANU, an AI assistant that answers questions about courses, scholarships, accommodation, jobs and events.",
    tags: ["AI assistant", "Firebase"],
    status: "Live",
    color: "#FBBC05",
    art: "chat",
    image: "/projects/askanu.png",
    href: "https://askanu-dev-gdg.web.app",
  },
  {
    name: "Sign Sense",
    blurb: "Learn and practise sign language with a guided, interactive exercise map.",
    tags: [],
    status: "Live",
    color: "#34A853",
    art: "vision",
    image: "/projects/signsense.png",
    href: "https://gdgsignsense.netlify.app/exercise_map",
  },
];
