import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ReleaseCard from "@/components/ReleaseCard";
import { releases, featuredRelease } from "@/content/releases";
import { formatReleaseDate, totalRuntime } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Music",
  description:
    "The complete Lammoth discography, from Nightshade of Mirkwood through to the album Onward.",
  alternates: { canonical: "/music" },
};

export default function MusicPage() {
  const rest = releases.filter((r) => !r.featured);

  return (
    <>
      <section className="shell pb-8 pt-40 sm:pt-48">
        <Reveal>
          <p className="label">Discography</p>
          <h1 className="display-xl mt-6" style={{ maxWidth: "11ch" }}>
            The Music of Lammoth
          </h1>
          <p className="lede mt-9">
            Five releases across three years. Every one of them is streamable and
            purchasable on Bandcamp.
          </p>
        </Reveal>
      </section>

      <section className="section" aria-labelledby="latest-heading">
        <div className="shell">
          <Reveal>
            <p className="label">Latest Release</p>
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Image
                src={featuredRelease.artwork}
                alt={featuredRelease.artworkAlt}
                width={1200}
                height={1200}
                sizes="(max-width: 1024px) 92vw, 40vw"
                priority
                className="w-full"
                style={{ boxShadow: "0 30px 90px rgba(0,0,0,0.55)" }}
              />
            </Reveal>
            <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
              <Reveal delay={0.08}>
                <h2 id="latest-heading" className="display-lg">
                  {featuredRelease.title}
                </h2>
                <p className="label mt-5">
                  {formatReleaseDate(featuredRelease.releaseDate)},{" "}
                  {featuredRelease.tracks.length} tracks,{" "}
                  {totalRuntime(featuredRelease.tracks)}
                </p>
                <p className="body-copy mt-8">{featuredRelease.intro}</p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href={featuredRelease.bandcampUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    Listen
                  </a>
                  <Link href={`/music/${featuredRelease.slug}`} className="btn btn-ghost">
                    Explore
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="complete-heading">
        <div className="shell">
          <Reveal>
            <p className="label">Complete Discography</p>
            <h2 id="complete-heading" className="display-lg mt-6">
              Everything released
            </h2>
          </Reveal>

          <ul className="mt-20 grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((r, i) => (
              <li key={r.slug}>
                <Reveal delay={i * 0.05}>
                  <ReleaseCard release={r} />
                  <p className="body-copy mt-5 text-sm">{r.intro}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
