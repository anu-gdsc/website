// Open committee roles shown in the "Join the team" section.
// TODO(content): confirm the real teams and what each one is looking for.

export type Role = {
  team: string;
  tagline: string;
  gain: string[];
  color: string;
};

export const roles: Role[] = [
  {
    team: "Events",
    tagline: "Plan the talks, workshops and socials people remember.",
    gain: ["Project management", "Venue & vendor wrangling", "Running live events"],
    color: "#4285F4",
  },
  {
    team: "Sponsorships",
    tagline: "Build relationships with the companies backing student builders.",
    gain: ["Pitching & negotiation", "Partner management", "Industry network"],
    color: "#FBBC05",
  },
  {
    team: "Marketing",
    tagline: "Tell the GDG ANU story across socials, posters and campus.",
    gain: ["Content & copywriting", "Design & video", "Community growth"],
    color: "#EA4335",
  },
  {
    team: "People & Culture",
    tagline: "Make sure every member feels like they belong here.",
    gain: ["Community building", "Mentorship", "Inclusive facilitation"],
    color: "#34A853",
  },
  {
    team: "Tech & Projects",
    tagline: "Build the tools and products that the club and its members use.",
    gain: ["Full-stack shipping", "Code review & teamwork", "Real users"],
    color: "#4285F4",
  },
  {
    team: "Design",
    tagline: "Shape how GDG ANU looks, feels and moves, on screen and in person.",
    gain: ["Brand & visual systems", "Product design", "Prototyping"],
    color: "#EA4335",
  },
];

export const values = [
  {
    title: "Learn out loud",
    body: "Questions are welcome at every level. We learn in public and share what we find.",
    color: "#4285F4",
  },
  {
    title: "Build real things",
    body: "Workshops end with something running. Projects end with something shipped.",
    color: "#34A853",
  },
  {
    title: "Everyone belongs",
    body: "Any degree, any year, any starting point. If you're curious, you're one of us.",
    color: "#FBBC05",
  },
  {
    title: "Pay it forward",
    body: "Today's members become tomorrow's mentors. We leave the door open behind us.",
    color: "#EA4335",
  },
] as const;
