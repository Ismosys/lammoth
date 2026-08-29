"use client";

import { useState } from "react";
import { socials } from "@/content/site";

export default function FollowTrail() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="section" aria-labelledby="follow-heading">
      <div className="shell">
        <p className="label">Follow the Trail</p>
        <h2 id="follow-heading" className="sr-only">
          Official platforms
        </h2>

        <ul className="mt-12" style={{ borderTop: "1px solid var(--line)" }}>
          {socials.map((s) => {
            const on = active === s.label;
            return (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActive(s.label)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(s.label)}
                  onBlur={() => setActive(null)}
                  className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-8 transition-colors duration-500 sm:py-10"
                  style={{
                    borderBottom: "1px solid var(--line)",
                    background: on
                      ? "color-mix(in srgb, var(--accent) 6%, transparent)"
                      : "transparent",
                  }}
                >
                  <span
                    className="display-md transition-all duration-500"
                    style={{
                      color: on ? "var(--accent)" : "var(--paper)",
                      transform: on ? "translateX(8px)" : "translateX(0)",
                    }}
                  >
                    {s.label}
                  </span>
                  <span className="body-copy text-sm" style={{ maxWidth: "34ch" }}>
                    {s.note}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
