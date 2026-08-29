import type { Rule } from "../types";

/**
 * Release document.
 *
 * Mirrors the Release type in lib/types.ts. Anything the artist should be able
 * to change without a developer lives here: titles, dates, artwork, tracklists,
 * credits, editorial copy, and the per release colour identity.
 */
export const release = {
  name: "release",
  title: "Release",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: Rule) => r.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r: Rule) => r.required(),
    },
    {
      name: "artist",
      title: "Billed artist",
      type: "string",
      description: "Differs from Lammoth on split and collaborative releases.",
      initialValue: "Lammoth",
      validation: (r: Rule) => r.required(),
    },
    {
      name: "format",
      title: "Format",
      type: "string",
      options: { list: ["album", "single"], layout: "radio" },
      validation: (r: Rule) => r.required(),
    },
    { name: "releaseDate", title: "Release date", type: "date", validation: (r: Rule) => r.required() },
    {
      name: "artwork",
      title: "Cover artwork",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describe the artwork for screen readers.",
          validation: (r: Rule) => r.required(),
        },
      ],
      validation: (r: Rule) => r.required(),
    },
    { name: "bandcampUrl", title: "Bandcamp URL", type: "url", validation: (r: Rule) => r.required() },
    { name: "genres", title: "Genres", type: "array", of: [{ type: "string" }] },
    {
      name: "tracks",
      title: "Tracklist",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Track title", type: "string", validation: (r: Rule) => r.required() },
            {
              name: "duration",
              title: "Duration in seconds",
              type: "number",
              validation: (r: Rule) => r.required().min(1),
            },
            { name: "performer", title: "Performer", type: "string", description: "Only on split releases." },
          ],
          preview: { select: { title: "title", subtitle: "performer" } },
        },
      ],
    },
    {
      name: "credits",
      title: "Credits",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "role", title: "Role", type: "string", validation: (r: Rule) => r.required() },
            { name: "name", title: "Name", type: "string", validation: (r: Rule) => r.required() },
            { name: "url", title: "Link", type: "url" },
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        },
      ],
    },
    {
      name: "intro",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "Shown on cards and the featured section.",
      validation: (r: Rule) => r.required().max(400),
    },
    {
      name: "story",
      title: "Story paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description: "Longer editorial copy for the release page.",
    },
    {
      name: "theme",
      title: "Colour identity",
      type: "object",
      description: "Sampled from this release's own cover artwork.",
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: "tint",
          title: "Paper tint",
          type: "string",
          description: "Hex value. A parchment biased toward this cover.",
        },
        {
          name: "accentOnLight",
          title: "Accent",
          type: "string",
          description: "Hex value. Must stay legible on the tint above.",
        },
        {
          name: "atmosphere",
          title: "Atmosphere note",
          type: "string",
          description: "A few words, shown in the archives timeline.",
        },
      ],
    },
    {
      name: "featured",
      title: "Current era",
      type: "boolean",
      description: "Marks the release the Listen Now button points to. Set on one release only.",
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: "Release date, newest first",
      name: "dateDesc",
      by: [{ field: "releaseDate", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "releaseDate", media: "artwork" },
  },
};
