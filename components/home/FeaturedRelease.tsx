import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { featuredRelease } from "@/content/releases";
import { formatReleaseDate, totalRuntime } from "@/lib/theme";

export default function FeaturedRelease() {
  const r = featuredRelease;

  return (
    <section className="section" aria-labelledby="featured-heading">
      <div className="shell">
        <Reveal>
          <p className="label">The Latest Chapter</p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6 xl:col-span-5">
            <div className="relative">
              <Image
                src={r.artwork}
                alt={r.artworkAlt}
                width={1200}
                height={1200}
                sizes="(max-width: 1024px) 92vw, 42vw"
                className="w-full"
                style={{ boxShadow: "0 30px 90px rgba(0,0,0,0.55)" }}
              />
            </div>
          </Reveal>

          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.08}>
              <h2 id="featured-heading" className="display-lg">
                {r.title}
              </h2>
              <p className="label mt-5">{r.artist}</p>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-3">
                <div>
                  <dt className="label">Released</dt>
                  <dd className="mt-2 text-sm">{formatReleaseDate(r.releaseDate)}</dd>
                </div>
                <div>
                  <dt className="label">Runtime</dt>
                  <dd className="mt-2 text-sm tabular-nums">
                    {totalRuntime(r.tracks)}
                  </dd>
                </div>
                <div>
                  <dt className="label">Format</dt>
                  <dd className="mt-2 text-sm capitalize">
                    {r.format}, {r.tracks.length} tracks
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="body-copy mt-9">{r.intro}</p>
            </Reveal>

            <Reveal delay={0.26}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {r.genres.map((g) => (
                  <li
                    key={g}
                    className="label"
                    style={{
                      border: "1px solid var(--line)",
                      padding: "0.5rem 0.85rem",
                    }}
                  >
                    {g}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-11 flex flex-wrap gap-4">
                <a
                  href={r.bandcampUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  Listen on Bandcamp
                </a>
                <Link href={`/music/${r.slug}`} className="btn btn-ghost">
                  Explore {r.title}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
