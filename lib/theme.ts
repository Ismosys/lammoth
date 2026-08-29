import type { CSSProperties } from "react";
import type { ReleaseTheme } from "@/lib/types";

/**
 * Turns a release theme into inline CSS custom properties. Any subtree given
 * these vars inherits that release's colour identity, so components stay
 * release agnostic and the archives page can transition between eras.
 */
export function themeVars(theme: ReleaseTheme): CSSProperties {
  return {
    "--accent": theme.accent,
    "--accent-2": theme.accent2,
    "--ground": theme.ground,
    "--raised": theme.raised,
    "--paper": theme.paper,
    /* Release grounds are dark, so artwork needs a deeper shadow than the shell. */
    "--shadow-art": "0 40px 110px rgba(0, 0, 0, 0.55)",
    /*
      Redeclaring the variables is not enough. Text colour is set once on body,
      so without re-applying it here the subtree keeps inheriting the shell's
      ink and a dark release renders dark text on a dark ground.
    */
    color: "var(--paper)",
  } as CSSProperties;
}

/**
 * Light variant of a release palette, for the archives timeline.
 *
 * The timeline runs five eras back to back. Giving each one its own dark room
 * would turn the whole page black and lose the parchment identity, so instead
 * every era tints the paper toward its own colour and darkens its accent to
 * hold contrast. The shift reads as a change of paper stock rather than a
 * change of lighting.
 */
export function archiveVars(theme: ReleaseTheme): CSSProperties {
  return {
    "--ground": theme.tint,
    "--raised": theme.tint,
    "--paper": "#241a10",
    "--muted": "#6b5f4b",
    "--line": "#d5cbb6",
    "--accent": theme.accentOnLight,
    "--accent-2": theme.accentOnLight,
    "--shadow-art": "0 30px 80px rgba(74, 52, 26, 0.22)",
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
