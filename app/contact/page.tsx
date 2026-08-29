import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { socials } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Lammoth about general inquiries, press, booking or collaborations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="shell pb-16 pt-40 sm:pt-48">
        <Reveal>
          <p className="label">Contact</p>
          <h1 className="display-xl mt-6" style={{ maxWidth: "10ch" }}>
            Send Word
          </h1>
          <p className="lede mt-9">
            For inquiries about the music, the releases, or working together.
          </p>
        </Reveal>
      </section>

      <section className="section pt-0">
        <div className="shell grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <p className="label">Elsewhere</p>
              <ul className="mt-6 flex flex-col gap-4">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="display-sm transition-colors duration-300 hover:text-[var(--accent)]"
                    >
                      {s.label}
                    </a>
                    <p className="label mt-1">{s.note}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
