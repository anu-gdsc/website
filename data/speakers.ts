export type Speaker = {
  name: string;
  role: string;
  company: string;
  topic: string;
  bio: string;
  category: string;
  image: string;
  color: "blue" | "green" | "yellow" | "red";
  linkedin?: string;
};

export const speakers: Speaker[] = [
  {
    name: "Harshil Siyani",
    role: "AI Engineer",
    company: "Google",
    topic: "Build Multiagent Systems with Google ADK",
    bio: "Harshil works at the intersection of AI and product engineering, with a focus on building multiagent architectures using Google's Agent Development Kit. He'll walk through how to go from idea to a working agent system — practically and without the fluff.",
    category: "AI",
    image: "/speakers/harshil.jpeg",
    color: "blue",
    linkedin: "#",
  },
  {
    name: "Anupam Phogat",
    role: "Software Engineer",
    company: "Industry",
    topic: "The Human API: Fixing the Gap Between University and Reality",
    bio: "Anupam brings a candid perspective on what university gets right and wrong about preparing developers for industry. He'll break down the hidden skills that matter most — communication, ownership, and navigating ambiguity — and how to build them now.",
    category: "Career",
    image: "/speakers/anu.png",
    color: "green",
    linkedin: "#",
  },
  {
    name: "Dave Hall",
    role: "Cloud Architect",
    company: "AWS User Group",
    topic: "Not Everything Needs an LLM",
    bio: "Dave makes a grounded case for when AI genuinely adds value and when simpler, cheaper, faster solutions are the better call. A perspective session for anyone building with AI who wants to think more clearly about tradeoffs.",
    category: "Cloud",
    image: "/speakers/dave.jpeg",
    color: "yellow",
    linkedin: "#",
  },
  {
    name: "Paul Wayper",
    role: "Senior Software Engineer",
    company: "Red Hat",
    topic: "Red Hat Insights Advisor & the Open Source Ecosystem",
    bio: "Paul shares what it actually looks like to build and ship inside a major open source project — the tooling, the culture, the contribution workflow, and why getting involved in open source is one of the highest-leverage things a student developer can do.",
    category: "Open Source",
    image: "/speakers/paul.png",
    color: "red",
    linkedin: "#",
  },
];
