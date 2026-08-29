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
