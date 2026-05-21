import { defineField, defineType } from "sanity";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "type",
      title: "Partner Type",
      type: "string",
      options: {
        list: [
          "Title Partner",
          "Institutional Partner",
          "Ecosystem Partner",
          "Community Partner",
          "Support Partner",
          "Creative Partner",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "website", title: "Website URL", type: "url" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
