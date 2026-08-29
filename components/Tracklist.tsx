"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Release } from "@/lib/types";
import { formatDuration, totalRuntime } from "@/lib/theme";

/**
 * Interactive tracklist.
 *
 * There is no in page player. Playback lives on Bandcamp, and every row states
 * that plainly rather than implying audio that does not exist here. Each row is
 * a real link, so keyboard and screen reader users get the same destination as
 * anyone hovering with a mouse.
 */
export default function Tracklist({ release }: { release: Release }) {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <div>
      <div
        className="flex flex-wrap items-baseline justify-between gap-4 pb-6"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <p className="label">
          {release.tracks.length} tracks
        </p>
        <p className="label">Total runtime {totalRuntime(release.tracks)}</p>
      </div>

      <ol className="mt-2">
        {release.tracks.map((track) => {
          const isActive = active === track.position;
          return (
            <li key={track.position}>
              <a
                href={release.bandcampUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActive(track.position)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(track.position)}
                onBlur={() => setActive(null)}
                className="group relative flex items-center gap-5 py-6 transition-colors duration-500 sm:gap-8 sm:py-7"
                style={{
                  borderBottom: "1px solid var(--line)",
                  background: isActive
                    ? "color-mix(in srgb, var(--accent) 7%, transparent)"
                    : "transparent",
                }}
              >
                <span
                  className="shrink-0 font-mono text-xs tabular-nums transition-colors duration-300"
                  style={{
                    color: isActive ? "var(--accent)" : "var(--muted)",
                    minWidth: "2ch",
                  }}
                >
                  {track.position.toString().padStart(2, "0")}
                </span>

                {/* Artwork preview, revealed on hover */}
                <motion.span
                  aria-hidden="true"
                  className="relative hidden shrink-0 overflow-hidden md:block"
                  initial={false}
                  animate={
                    reduced
                      ? { width: 0, opacity: 0 }
                      : { width: isActive ? 68 : 0, opacity: isActive ? 1 : 0 }
                  }
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: 68 }}
                >
                  <Image
                    src={release.artwork}
                    alt=""
                    width={136}
                    height={136}
                    sizes="68px"
                    className="h-[68px] w-[68px] object-cover"
                  />
                </motion.span>

                <span className="min-w-0 flex-1">
                  <span
                    className="display-sm block transition-all duration-500"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--paper)",
                      transform: reduced || !isActive ? "none" : "translateX(6px)",
                    }}
                  >
                    {track.title}
                  </span>
                  {track.performer && (
                    <span className="label mt-2 block">{track.performer}</span>
                  )}
                </span>

                <span
                  className="label shrink-0 transition-opacity duration-300"
                  style={{ opacity: isActive ? 0 : 1 }}
                >
                  {formatDuration(track.duration)}
                </span>

                <span
                  className="label absolute right-0 shrink-0 transition-opacity duration-300"
                  style={{
                    opacity: isActive ? 1 : 0,
                    color: "var(--accent)",
                  }}
                >
                  Play on Bandcamp
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      <p className="body-copy mt-8 text-sm">
        Full streaming and downloads are hosted on Bandcamp.{" "}
        <a
          href={release.bandcampUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors duration-300 hover:text-[var(--accent)]"
        >
          Listen to {release.title} there
        </a>
        .
      </p>
    </div>
  );
}
