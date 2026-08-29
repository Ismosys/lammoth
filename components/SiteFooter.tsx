import Link from "next/link";
import { nav, site, socials } from "@/content/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="shell pb-14 pt-24">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p
              className="display-md"
              style={{ letterSpacing: "0.16em", lineHeight: 1 }}
            >
              LAMMOTH
            </p>
            <p className="label mt-4">{site.tagline}</p>
            <p className="body-copy mt-6 text-sm" style={{ maxWidth: "34ch" }}>
              Atmospheric black metal, blackgaze and electronic music from{" "}
              {site.location}.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="label mb-5">Navigate</p>
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="tap text-sm transition-colors duration-300 hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label mb-5">Follow</p>
            <ul className="flex flex-col">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap text-sm transition-colors duration-300 hover:text-[var(--accent)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-20 flex flex-col gap-3 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid var(--line)", color: "var(--muted)" }}
        >
          <p>
            &copy; {year} Lammoth. All rights reserved.
          </p>
          <p>
            Artwork remains the property of its respective artists.
          </p>
        </div>
      </div>
    </footer>
  );
}
