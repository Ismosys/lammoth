import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Tracklist from "@/components/Tracklist";
import ReleaseCard from "@/components/ReleaseCard";
import { getRelease, releases } from "@/content/releases";
import { site } from "@/content/site";
import { formatReleaseDate, themeVars, totalRuntime } from "@/lib/theme";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return releases.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const release = getRelease(slug);
  if (!release) return {};

  return {
    title: release.title,
    description: release.intro,
    alternates: { canonical: `/music/${release.slug}` },
    openGraph: {
      type: "music.album",
      title: `${release.title} by ${release.artist}`,
      description: release.intro,
      url: `${site.url}/music/${release.slug}`,
      images: [
        {
          url: release.artwork,
          width: 1200,
          height: 1200,
          alt: release.artworkAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${release.title} by ${release.artist}`,
      description: release.intro,
      images: [release.artwork],
    },
  };
}

export default async function ReleasePage({ params }: Props) {
  const { slug } = await params;
  const release = getRelease(slug);
  if (!release) notFound();

  const others = releases.filter((r) => r.slug !== release.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: release.title,
    byArtist: { "@type": "MusicGroup", name: release.artist },
    datePublished: release.releaseDate,
    genre: release.genres,
    image: `${site.url}${release.artwork}`,
    url: `${site.url}/music/${release.slug}`,
    numTracks: release.tracks.length,
    track: release.tracks.map((t) => ({
      "@type": "MusicRecording",
      position: t.position,
      name: t.title,
      duration: `PT${Math.floor(t.duration / 60)}M${t.duration % 60}S`,
    })),
  };

  return (
    /* Every release carries its own palette. Nothing below reads the slug. */
    <div style={themeVars(release.theme)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section
        className="vignette relative flex min-h-[92svh] items-end overflow-hidden pb-20 pt-40"
        style={{ background: "var(--ground)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(100% 70% at 75% 15%, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 60%)",
          }}
        />
        <div className="shell relative z-10 grid w-full items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label">{release.artist}</p>
            <h1 className="display-xl mt-5">{release.title}</h1>
            <p className="label mt-7 tabular-nums">
              {release.year}, {release.format}, {release.tracks.length}{" "}
              {release.tracks.length === 1 ? "track" : "tracks"}
            </p>
            <div className="mt-11 flex flex-wrap gap-4">
              <a
                href={release.bandcampUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Listen
              </a>
              <a
                href={release.bandcampUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Visit Bandcamp
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Image
              src={release.artwork}
              alt={release.artworkAlt}
              width={1200}
              height={1200}
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="w-full"
              style={{ boxShadow: "var(--shadow-art)" }}
            />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section" style={{ background: "var(--ground)" }}>
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label">Released</p>
            <p className="display-sm mt-4">{formatReleaseDate(release.releaseDate)}</p>
            <p className="label mt-8">Runtime</p>
            <p className="display-sm mt-4 tabular-nums">{totalRuntime(release.tracks)}</p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            <p className="lede">{release.intro}</p>
            <ul className="mt-10 flex flex-wrap gap-2">
              {release.genres.map((g) => (
                <li
                  key={g}
                  className="label"
                  style={{ border: "1px solid var(--line)", padding: "0.5rem 0.85rem" }}
                >
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Tracklist */}
      <section className="section" style={{ background: "var(--raised)" }}>
        <div className="shell">
          <Reveal>
            <h2 className="display-lg" style={{ maxWidth: "12ch" }}>
              Tracklist
            </h2>
          </Reveal>
          <div className="mt-14">
            <Tracklist release={release} />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section" style={{ background: "var(--ground)" }}>
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="display-md">The Story</h2>
            <p className="label mt-6">{release.theme.atmosphere}</p>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            {release.story.map((para, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="body-copy mt-6 first:mt-0">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="section" style={{ background: "var(--raised)" }}>
        <div className="shell">
          <Reveal>
            <h2 className="display-md">Credits</h2>
          </Reveal>
          <dl className="mt-12" style={{ borderTop: "1px solid var(--line)" }}>
            {release.credits.map((c, i) => (
              <Reveal key={`${c.role}-${i}`} delay={i * 0.04}>
                <div
                  className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <dt className="label sm:max-w-[45%]">{c.role}</dt>
                  <dd className="display-sm">
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tap transition-colors duration-300 hover:text-[var(--accent)]"
                      >
                        {c.name}
                      </a>
                    ) : (
                      c.name
                    )}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* More from the archives */}
      <section className="section" style={{ background: "var(--ground)" }}>
        <div className="shell">
          <Reveal>
            <p className="label">More from the Archives</p>
          </Reveal>
          <ul className="mt-14 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((r, i) => (
              <li key={r.slug}>
                <Reveal delay={i * 0.06}>
                  <ReleaseCard release={r} />
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal>
            <Link href="/archives" className="btn btn-ghost mt-16">
              View the Archives
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
