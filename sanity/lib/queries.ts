import { client } from "./client";

export async function getSpeakers() {
  return client.fetch(
    `*[_type == "speaker"] | order(order asc) {
      name, role, company, topic, bio, category, color, linkedin,
      "image": image.asset->url
    }`
  );
}

export async function getSponsors() {
  return client.fetch(
    `*[_type == "sponsor"] | order(order asc) {
      name, type, website,
      "logo": logo.asset->url
    }`
  );
}

export async function getScheduleItems() {
  return client.fetch(
    `*[_type == "scheduleItem"] | order(order asc) {
      time, title, desc, type
    }`
  );
}

export async function getFaqs() {
  return client.fetch(
    `*[_type == "faq"] | order(order asc) {
      q, a
    }`
  );
}

export async function getTracks() {
  return client.fetch(
    `*[_type == "track"] | order(order asc) {
      title, desc
    }`
  );
}
