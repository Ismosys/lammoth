"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { onwardChapters } from "@/content/site";
import type { StoryChapter } from "@/lib/types";

function Chapter({ chapter, index }: { chapter: StoryChapter; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
    >
      <div
        className={
          flip
            ? "lg:col-span-6 lg:col-start-7 lg:row-start-1"
            : "lg:col-span-6"
        }
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            className="absolute inset-[-8%]"
            style={reduced ? undefined : { y }}
          >
            <Image
              src={chapter.artwork}
              alt={chapter.artworkAlt}
              fill
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-cover"
            />
          </motion.div>
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(to top, color-mix(in srgb, var(--ground) 78%, transparent), transparent 60%)",
            }}
          />
        </div>
      </div>

      <div className={flip ? "lg:col-span-5 lg:row-start-1" : "lg:col-span-5 lg:col-start-8"}>
        <p className="label">Chapter {chapter.numeral}</p>
        <h3 className="display-md mt-5">{chapter.title}</h3>
        <p className="body-copy mt-6">{chapter.body}</p>
      </div>
    </div>
  );
}

export default function StoryChapters() {
  return (
    <section className="section" aria-labelledby="story-heading">
      <div className="shell">
        <h2 id="story-heading" className="display-lg" style={{ maxWidth: "14ch" }}>
          The Road Goes On
        </h2>
        <p className="lede mt-7">
          Four movements through the album, read as a booklet rather than a
          tracklist.
        </p>

        <div className="mt-24 flex flex-col gap-28 lg:gap-36">
          {onwardChapters.map((c, i) => (
            <Chapter key={c.numeral} chapter={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
