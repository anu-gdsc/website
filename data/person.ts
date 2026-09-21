// The president's public profile. Feeds the /team/saheb-yuvraj-singh page, the team chart link,
// the footer credit and the Person structured data that helps search engines connect the name to GDG ANU.

export const PRESIDENT = {
  name: "Saheb Yuvraj Singh",
  alternateNames: ["Yuvraj", "Saheb Yuvraj"],
  jobTitle: "President",
  slug: "saheb-yuvraj-singh",
  // TODO(content): add real profile links, they are the strongest signal for tying the name to a person:
  // LinkedIn, GitHub, personal site, ANU or GDG community profile.
  sameAs: [] as string[],
  // TODO(content): add a short bio (education, interests, what you have built). Only facts you are happy to publish.
  bio: "" as string,
} as const;

export const PRESIDENT_PATH = `/team/${PRESIDENT.slug}`;

/** Team members who have a profile page, keyed by display name. */
export const PROFILE_LINKS: Record<string, string> = {
  [PRESIDENT.name]: PRESIDENT_PATH,
};
