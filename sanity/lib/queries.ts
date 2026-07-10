import { client } from "./client";

export async function getSpeakers() {
  try {
    return await client.fetch(
      `*[_type == "speaker"] | order(order asc) {
        name, role, company, topic, bio, category, color, linkedin,
        "image": image.asset->url
      }`
    );
  } catch {
    return [];
  }
}

export async function getSponsors() {
  try {
    return await client.fetch(
      `*[_type == "sponsor"] | order(order asc) {
        name, type, website,
        "logo": logo.asset->url
      }`
    );
  } catch {
    return [];
  }
}

export async function getScheduleItems() {
  try {
    return await client.fetch(
      `*[_type == "scheduleItem"] | order(order asc) {
        time, title, desc, type
      }`
    );
  } catch {
    return [];
  }
}

export async function getFaqs() {
  try {
    return await client.fetch(
      `*[_type == "faq"] | order(order asc) {
        q, a
      }`
    );
  } catch {
    return [];
  }
}

export async function getTracks() {
  try {
    return await client.fetch(
      `*[_type == "track"] | order(order asc) {
        title, desc
      }`
    );
  } catch {
    return [];
  }
}

export async function getTeamMembers() {
  try {
    return await client.fetch(
      `*[_type == "teamMember"] | order(order asc) {
        name, role, department, github, linkedin,
        "image": image.asset->url
      }`
    );
  } catch {
    return [];
  }
}
