"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { featuredRelease } from "@/content/releases";
import { site } from "@/content/site";

/**
 * Cinematic hero.
 *
 * The composition is deliberately off centre: identity and campaign copy sit on
 * a wide left column, artwork breaks the right edge of the grid. Layers respond
 * to the cursor at different depths, which is switched off entirely for coarse
 * pointers and for anyone who prefers reduced motion.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setPointer({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame.current);
    };
  }, [reduced]);

  const shift = (depth: number) => ({
    transform: `translate3d(${pointer.x * depth}px, ${pointer.y * depth}px, 0)`,
  });

  return (
    <section
      className="vignette relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 sm:pb-20"
      aria-labelledby="hero-heading"
    >
      {/* Atmospheric ground. Layered gradients standing in for hills and haze. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            ...shift(-14),
            background:
              "radial-gradient(120% 70% at 70% 8%, color-mix(in srgb, var(--accent) 16%, transparent) 0%, transparent 58%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[62%] transition-transform duration-700 ease-out"
          style={{
            ...shift(-7),
            background:
              "radial-gradient(90% 100% at 30% 100%, color-mix(in srgb, var(--accent-2) 20%, transparent) 0%, transparent 62%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, var(--ground) 12%, transparent 100%)",
          }}
        />
      </div>

      <div className="shell relative z-10 w-full">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Identity and campaign copy */}
          <div className="lg:col-span-7 xl:col-span-6">
            <motion.p
              className="label"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {site.tagline}
            </motion.p>

            <motion.h1
              id="hero-heading"
              className="display-xl mt-5"
              /* LAMMOTH is a single unbreakable word, so the hero caps tighter
                 than the shared display scale to stay inside its column. */
              style={{
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.75rem, 8.4vw, 8.5rem)",
              }}
              initial={reduced ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              LAMMOTH
            </motion.h1>

            <motion.div
              className="mt-10 flex flex-col gap-3"
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="display-md"
                style={{ color: "var(--accent)", letterSpacing: "0.02em" }}
              >
                {featuredRelease.title}
              </span>
              <span className="lede" style={{ maxWidth: "30ch" }}>
                A journey begins.
              </span>
            </motion.div>

            <motion.div
              className="mt-11 flex flex-wrap gap-4"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={featuredRelease.bandcampUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Listen Now
              </a>
              <Link
                href={`/music/${featuredRelease.slug}`}
                className="btn btn-ghost"
              >
                Explore the Album
              </Link>
            </motion.div>
          </div>

          {/* Artwork, breaking the grid on the right */}
          <motion.div
            className="lg:col-span-5 lg:col-start-8 xl:col-span-6 xl:col-start-7"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative ml-auto w-full max-w-[30rem] transition-transform duration-700 ease-out lg:max-w-none"
              style={shift(18)}
            >
              <div
                className="absolute -inset-6 -z-10 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <Image
                src={featuredRelease.artwork}
                alt={featuredRelease.artworkAlt}
                width={1200}
                height={1200}
                priority
                sizes="(max-width: 1024px) 90vw, 46vw"
                className="w-full"
                style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.6)" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex items-center gap-4"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <span className="label" style={{ fontSize: "0.5625rem" }}>
            Scroll
          </span>
          <span
            className="block h-px flex-1 max-w-24"
            style={{ background: "var(--line)" }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
