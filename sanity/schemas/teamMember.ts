import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      validation: (r) => r.required(),
      options: {
        list: [
          { title: "Leadership",  value: "leadership"  },
          { title: "Operations",  value: "operations"  },
          { title: "Projects",    value: "projects"    },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
      description: "Optional — leave blank to hide the icon",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      description: "Optional — leave blank to hide the icon",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower = appears first within the department",
    }),
  ],
  orderings: [
    {
      title: "Department → Order",
      name: "deptThenOrder",
      by: [
        { field: "department", direction: "asc" },
        { field: "order",      direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
