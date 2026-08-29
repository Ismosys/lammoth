import type { CSSProperties } from "react";
import type { ReleaseTheme } from "@/lib/types";

/** Shared bark ink used across every light surface. */
const INK = "#241a10";

/**
 * A release palette expressed on paper.
 *
 * Every surface on the site is now parchment, so a release identity is carried
 * by tinting the paper toward its own colour and darkening its accent to hold
 * contrast, rather than by switching the lights off. An era reads as a change
 * of paper stock.
 *
 * Used by the archives timeline, the release cards and the release pages, so a
 * release looks like itself everywhere it appears.
 */
export function paperVars(theme: ReleaseTheme): CSSProperties {
  return {
    "--ground": theme.tint,
    /* Raised bands sit a touch deeper than the ground so alternating sections
       still separate without introducing a second hue. */
    "--raised": `color-mix(in srgb, ${theme.tint} 93%, ${INK})`,
    "--paper": INK,
    "--muted": "#655945",
    "--line": `color-mix(in srgb, ${theme.tint} 82%, ${INK})`,
    "--accent": theme.accentOnLight,
    "--accent-2": theme.accentOnLight,
    "--shadow-art": "0 30px 80px rgba(74, 52, 26, 0.22)",
    /* Text colour is set once on body, so a themed subtree has to re-apply it
       or it keeps inheriting the shell's ink. */
    color: "var(--paper)",
  } as CSSProperties;
}

/** Seconds to m:ss. */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Total runtime of a track list, as m:ss. */
export function totalRuntime(tracks: { duration: number }[]): string {
  return formatDuration(tracks.reduce((sum, t) => sum + t.duration, 0));
}

export function formatReleaseDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
