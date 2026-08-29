"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Release } from "@/lib/types";
import { themeVars } from "@/lib/theme";

/**
 * A release presented as an artifact rather than a catalogue tile. Each card
 * carries its own release theme, so a row of them reads as five different
 * worlds instead of one repeated component.
 */
export default function ReleaseCard({ release }: { release: Release }) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/music/${release.slug}`}
      style={themeVars(release.theme)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="group relative flex w-full flex-col"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={release.artwork}
          alt={release.artworkAlt}
          fill
          sizes="(max-width: 768px) 88vw, (max-width: 1280px) 44vw, 30vw"
          className="object-cover transition-transform duration-[900ms]"
          style={{
            transform: hover ? "scale(1.05)" : "scale(1)",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          aria-hidden="true"
          style={{
            opacity: hover ? 0.16 : 0.42,
            background:
              "linear-gradient(to top, var(--ground) 8%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500"
          aria-hidden="true"
          style={{
            background: "var(--accent)",
            transform: hover ? "scaleX(1)" : "scaleX(0)",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>

      <div className="flex items-baseline justify-between gap-4 pt-6">
        <h3
          className="display-sm transition-colors duration-500"
          style={{ color: hover ? "var(--accent)" : "var(--paper)" }}
        >
          {release.title}
        </h3>
        <span className="label shrink-0 tabular-nums">{release.year}</span>
      </div>

      <p className="label mt-3">
        {release.format === "album" ? "Album" : "Single"}
        {release.artist !== "Lammoth" ? `, with ${release.artist.replace("Lammoth and ", "")}` : ""}
      </p>

      <span
        className="label mt-5 inline-flex items-center gap-2 transition-colors duration-300"
        style={{ color: hover ? "var(--accent)" : "var(--muted)" }}
      >
        Explore
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-500"
          style={{
            transform: hover ? "translateX(5px)" : "translateX(0)",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}
