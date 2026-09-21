import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

/** False until NEXT_PUBLIC_SANITY_PROJECT_ID is set, lets queries skip the network call and fall back to local data. */
export const hasSanity = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
