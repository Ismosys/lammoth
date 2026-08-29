"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Release } from "@/lib/types";
import { formatReleaseDate, themeVars, totalRuntime } from "@/lib/theme";

/**
 * Chronological timeline.
 *
 * Each era owns a full viewport band. An IntersectionObserver tracks which band
 * is centred and lifts that release's palette to the section wrapper, so ground,
 * accent and paper all transition together as the visitor moves through the
 * catalogue. The observer is cheap and needs no scroll listener.
 */
export default function ArchiveTimeline({ releases }: { releases: Release[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = refs.current.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActiveIndex(index);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.1, 0.5, 0.9] },
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [releases.length]);

  const active = releases[activeIndex] ?? releases[0];

  return (
    <div
      style={{
        ...themeVars(active.theme),
        background: "var(--ground)",
        transition: "background 900ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Fixed era readout */}
      <div className="pointer-events-none sticky top-0 z-20 hidden lg:block">
        <div className="shell flex items-center justify-between py-8">
          <span className="label tabular-nums">
            {String(activeIndex + 1).padStart(2, "0")} / {String(releases.length).padStart(2, "0")}
          </span>
          <motion.span
            key={active.slug}
            className="label"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: "var(--accent)" }}
          >
            {active.theme.atmosphere}
          </motion.span>
        </div>
      </div>

      {releases.map((release, i) => (
        <section
          key={release.slug}
          ref={(el) => {
            refs.current[i] = el;
          }}
          aria-labelledby={`era-${release.slug}`}
          className="relative flex min-h-[92svh] items-center py-24"
          style={themeVars(release.theme)}
        >
          <div className="shell grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div
              className={
                i % 2 === 0
                  ? "lg:col-span-5"
                  : "lg:col-span-5 lg:col-start-8 lg:row-start-1"
              }
            >
              <Link
                href={`/music/${release.slug}`}
                className="group block"
                aria-label={`${release.title}, ${release.year}`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={release.artwork}
                    alt={release.artworkAlt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 38vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                  />
                </div>
              </Link>
            </div>

            <div
              className={
                i % 2 === 0
                  ? "lg:col-span-6 lg:col-start-7"
                  : "lg:col-span-6 lg:row-start-1"
              }
            >
              <p className="label tabular-nums" style={{ color: "var(--accent)" }}>
                {release.year}
              </p>
              <h2 id={`era-${release.slug}`} className="display-lg mt-5">
                {release.title}
              </h2>
              <p className="label mt-5">
                {release.artist}, {release.format}, {totalRuntime(release.tracks)}
              </p>
              <p className="body-copy mt-8">{release.intro}</p>
              <p className="label mt-8">{formatReleaseDate(release.releaseDate)}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={`/music/${release.slug}`} className="btn">
                  Explore
                </Link>
                <a
                  href={release.bandcampUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Listen
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
