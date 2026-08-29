import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { about, collaborators, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lammoth is a solo atmospheric black metal, blackgaze and electronic project based in Asheville.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="vignette relative flex min-h-[70svh] items-end overflow-hidden pb-20 pt-40">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(90% 60% at 25% 20%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 62%)",
          }}
        />
        <div className="shell relative z-10">
          <p className="label">About</p>
          <h1 className="display-xl mt-6" style={{ maxWidth: "12ch" }}>
            Behind the Blasphemy
          </h1>
          <p className="lede mt-9">{about.intro}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="artist-heading">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label">01</p>
            <h2 id="artist-heading" className="display-md mt-4">
              The Artist
            </h2>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            {about.artist.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="body-copy mt-6 first:mt-0">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--raised)" }} aria-labelledby="project-heading">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label">02</p>
            <h2 id="project-heading" className="display-md mt-4">
              The Project
            </h2>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            {about.project.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="body-copy mt-6 first:mt-0">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="sound-heading">
        <div className="shell">
          <Reveal>
            <p className="label">03</p>
            <h2 id="sound-heading" className="display-md mt-4">
              The Sound
            </h2>
          </Reveal>
          <ul className="mt-14" style={{ borderTop: "1px solid var(--line)" }}>
            {about.genres.map((g, i) => (
              <li key={g}>
                <Reveal delay={i * 0.04}>
                  <p
                    className="display-md py-6"
                    style={{ borderBottom: "1px solid var(--line)" }}
                  >
                    {g}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" style={{ background: "var(--raised)" }} aria-labelledby="world-heading">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label">04</p>
            <h2 id="world-heading" className="display-md mt-4">
              The World
            </h2>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            {about.world.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="body-copy mt-6 first:mt-0">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="collab-heading">
        <div className="shell">
          <Reveal>
            <p className="label">05</p>
            <h2 id="collab-heading" className="display-md mt-4">
              Collaborators
            </h2>
            <p className="body-copy mt-6">
              Everyone credited on an official release.
            </p>
          </Reveal>

          <dl className="mt-14" style={{ borderTop: "1px solid var(--line)" }}>
            {collaborators.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.04}>
                <div
                  className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <dt className="display-sm">
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-300 hover:text-[var(--accent)]"
                      >
                        {c.name}
                      </a>
                    ) : (
                      c.name
                    )}
                  </dt>
                  <dd className="label sm:max-w-[50%] sm:text-right">{c.role}</dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal>
            <p className="body-copy mt-14 text-sm">
              Based in {site.location}.{" "}
              <Link
                href="/contact"
                className="underline underline-offset-4 transition-colors duration-300 hover:text-[var(--accent)]"
              >
                Get in touch
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
