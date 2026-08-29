import Link from "next/link";
import Reveal from "@/components/Reveal";
import { about } from "@/content/site";

export default function AboutPreview() {
  return (
    <section className="section" aria-labelledby="about-preview-heading">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="label">Behind the Blasphemy</p>
            <h2 id="about-preview-heading" className="display-lg mt-6">
              One person, one catalogue
            </h2>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.08}>
              <p className="lede">{about.intro}</p>
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
