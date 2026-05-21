import { defineField, defineType } from "sanity";

export const speaker = defineType({
  name: "speaker",
  title: "Speaker",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "company", title: "Company", type: "string", validation: (r) => r.required() }),
    defineField({ name: "topic", title: "Talk Topic", type: "string", validation: (r) => r.required() }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["AI", "Cloud", "Career", "Open Source", "Web", "Other"] },
    }),
    defineField({
      name: "color",
      title: "Card Color",
      type: "string",
      options: { list: ["blue", "green", "yellow", "red"] },
    }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
