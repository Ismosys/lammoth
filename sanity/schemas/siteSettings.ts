import type { Rule } from "../types";

/** Everything outside the discography that the artist should control. */
export const siteSettings = {
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "description", title: "Site description", type: "text", rows: 3 },
    { name: "location", title: "Location", type: "string" },
    {
      name: "socials",
      title: "Official links",
      type: "array",
      description: "Only add platforms with a verified official presence.",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Platform", type: "string", validation: (r: Rule) => r.required() },
            { name: "url", title: "URL", type: "url", validation: (r: Rule) => r.required() },
            { name: "note", title: "Short note", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
    },
    {
      name: "about",
      title: "About page",
      type: "object",
      fields: [
        { name: "intro", title: "Intro", type: "text", rows: 2 },
        { name: "artist", title: "The Artist", type: "array", of: [{ type: "text", rows: 4 }] },
        { name: "project", title: "The Project", type: "array", of: [{ type: "text", rows: 4 }] },
        { name: "world", title: "The World", type: "array", of: [{ type: "text", rows: 4 }] },
        { name: "genres", title: "Genres", type: "array", of: [{ type: "string" }] },
      ],
    },
    {
      name: "collaborators",
      title: "Collaborators",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "url", title: "Link", type: "url" },
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        },
      ],
    },
    { name: "statement", title: "Editorial statement", type: "string" },
    {
      name: "storyChapters",
      title: "Featured story chapters",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "numeral", title: "Numeral", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "body", title: "Body", type: "text", rows: 3 },
            {
              name: "artwork",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alternative text", type: "string" }],
            },
          ],
          preview: { select: { title: "title", subtitle: "numeral" } },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
};
