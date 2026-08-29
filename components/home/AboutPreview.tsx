import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { about } from "@/content/site";

export default function AboutPreview() {
  return (
    <section className="section" aria-labelledby="about-preview-heading">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <Image
                src={about.portrait.src}
                alt={about.portrait.alt}
                width={1200}
                height={1200}
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="w-full object-cover"
                style={{ boxShadow: "var(--shadow-art)" }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in srgb, var(--ground) 30%, transparent) 0%, transparent 45%)",
                }}
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="label">Behind the Blasphemy</p>
              <h2 id="about-preview-heading" className="display-lg mt-6">
                One person, one catalogue
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="lede mt-9">{about.intro}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="body-copy mt-7">{about.artist[0]}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/about" className="btn btn-ghost mt-10">
                Enter the Story
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
