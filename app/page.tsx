import Hero from "@/components/home/Hero";
import FeaturedRelease from "@/components/home/FeaturedRelease";
import Tracklist from "@/components/Tracklist";
import StoryChapters from "@/components/home/StoryChapters";
import Statement from "@/components/home/Statement";
import ArchivesPreview from "@/components/home/ArchivesPreview";
import AboutPreview from "@/components/home/AboutPreview";
import FollowTrail from "@/components/home/FollowTrail";
import Signup from "@/components/home/Signup";
import Reveal from "@/components/Reveal";
import { featuredRelease } from "@/content/releases";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedRelease />

      <section className="section" aria-labelledby="journey-heading">
        <div className="shell">
          <Reveal>
            <p className="label">The Journey</p>
            <h2 id="journey-heading" className="display-lg mt-6" style={{ maxWidth: "12ch" }}>
              Nine movements
            </h2>
          </Reveal>
          <div className="mt-16">
            <Tracklist release={featuredRelease} />
          </div>
        </div>
      </section>

      <StoryChapters />
      <Statement />
      <ArchivesPreview />
      <AboutPreview />
      <FollowTrail />
      <Signup />
    </>
  );
}
