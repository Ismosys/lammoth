import type { Metadata } from "next";
import ArchiveTimeline from "@/components/ArchiveTimeline";
import Reveal from "@/components/Reveal";
import { chronological } from "@/content/releases";

export const metadata: Metadata = {
  title: "Archives",
  description:
    "A chronological record of every Lammoth release, from the first single in 2024 to the album Onward.",
  alternates: { canonical: "/archives" },
};

export default function ArchivesPage() {
  return (
    <>
      <section className="shell pb-24 pt-40 sm:pt-48">
        <Reveal>
          <h1 className="display-xl" style={{ maxWidth: "10ch" }}>
            The Archives
          </h1>
          <p className="lede mt-9">A record of the journey.</p>
          <p className="body-copy mt-7">
            Scroll to move forward through the catalogue. Each release carries the
            colour of its own artwork, so the ground shifts underneath as the eras
            change.
          </p>
        </Reveal>
      </section>

      <ArchiveTimeline releases={chronological} />
    </>
  );
}
