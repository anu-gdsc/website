import { defineField, defineType } from "sanity";

export const scheduleItem = defineType({
  name: "scheduleItem",
  title: "Schedule Item",
  type: "document",
  fields: [
    defineField({ name: "time", title: "Time", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "desc", title: "Short Description", type: "text", rows: 2 }),
    defineField({
      name: "type",
      title: "Session Type",
      type: "string",
      options: { list: ["Arrival", "Keynote", "Talks", "Networking", "Workshop", "Discussion", "Closing"] },
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
