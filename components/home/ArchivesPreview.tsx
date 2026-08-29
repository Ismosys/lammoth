import Link from "next/link";
import Reveal from "@/components/Reveal";
import ReleaseCard from "@/components/ReleaseCard";
import { releases } from "@/content/releases";

export default function ArchivesPreview() {
  const past = releases.filter((r) => !r.featured);

  return (
    <section className="section" aria-labelledby="archives-preview-heading">
      <div className="shell">
        <Reveal>
          <p className="label">From the Archives</p>
          <h2 id="archives-preview-heading" className="display-lg mt-6" style={{ maxWidth: "16ch" }}>
            Earlier ground
          </h2>
        </Reveal>
      </div>

      {/* Horizontal on desktop, stacked on mobile. */}
      <div className="mt-16 overflow-x-auto pb-4">
        <ul className="shell flex gap-8 lg:gap-10" style={{ minWidth: "min-content" }}>
          {past.map((r, i) => (
            <li key={r.slug} className="w-[78vw] shrink-0 sm:w-[46vw] lg:w-[26vw]">
              <Reveal delay={i * 0.06}>
                <ReleaseCard release={r} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <div className="shell mt-16">
        <Reveal>
          <Link href="/archives" className="btn btn-ghost">
            View the Archives
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
