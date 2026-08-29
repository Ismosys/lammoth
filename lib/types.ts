/**
 * Content models for the Lammoth site.
 *
 * These types are the contract between the presentation layer and whatever
 * supplies the content. Today that is the typed files in /content. Swapping in
 * Sanity (schemas live in /sanity/schemas) only requires that the query layer
 * return these same shapes, so no component needs to change.
 */

/** Per release colour identity, derived from that release's own cover artwork. */
/**
 * A release's colour identity, sampled from its own cover artwork.
 *
 * The site is parchment throughout, so an era is expressed as a change of
 * paper stock rather than a change of lighting.
 */
export type ReleaseTheme = {
  /** Paper tint for this release. A parchment biased toward the cover. */
  tint: string;
  /** Accent dark enough to hold contrast on that tint. */
  accentOnLight: string;
  /** Short human description of the atmosphere, shown in the archives timeline. */
  atmosphere: string;
};

export type Track = {
  position: number;
  title: string;
  /** Seconds. Sourced from the official release. */
  duration: number;
  /** Credited performer when a release splits authorship between artists. */
  performer?: string;
};

export type CreditLine = {
  role: string;
  name: string;
  url?: string;
};

export type ReleaseFormat = "album" | "single";

export type Release = {
  slug: string;
  title: string;
  /** Billed artist. Differs from "Lammoth" on collaborative releases. */
  artist: string;
  format: ReleaseFormat;
  /** ISO date string. */
  releaseDate: string;
  year: number;
  artwork: string;
  artworkAlt: string;
  bandcampUrl: string;
  genres: string[];
  tracks: Track[];
  credits: CreditLine[];
  /** Original editorial copy written for this site. */
  intro: string;
  /** Longer original editorial copy for the release page. */
  story: string[];
  theme: ReleaseTheme;
  /** Marks the current era. Exactly one release should carry this. */
  featured?: boolean;
};

export type StoryChapter = {
  numeral: string;
  title: string;
  body: string;
  artwork: string;
  artworkAlt: string;
};

export type SocialLink = {
  label: string;
  url: string;
  /** Short editorial line shown beside the platform name. */
  note: string;
};

export type Collaborator = {
  name: string;
  role: string;
  url?: string;
};

export type ContactCategory = {
  value: string;
  label: string;
  description: string;
};
