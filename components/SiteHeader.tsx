"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav, site } from "@/content/site";
import { featuredRelease } from "@/content/releases";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/*
        The header is fixed outside every page's themed subtree, so it cannot
        inherit a release palette. It carries the shell ground as a solid
        masthead band instead, which keeps it legible over both the parchment
        shell and the dark release pages underneath.
      */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-shadow duration-500"
        style={{
          background: "var(--ground)",
          color: "var(--paper)",
          borderBottom: `1px solid ${lifted ? "var(--line)" : "transparent"}`,
          boxShadow: lifted ? "0 10px 30px rgba(74, 52, 26, 0.10)" : "none",
        }}
      >
        <div className="shell flex items-center justify-between gap-6 py-5">
          <Link
            href="/"
            className="group flex min-h-[2.75rem] flex-col justify-center leading-none"
            aria-label={`${site.name}, home`}
          >
            <span
              className="font-display text-xl tracking-[0.3em] transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-2xl"
              style={{ letterSpacing: "0.28em" }}
            >
              LAMMOTH
            </span>
            <span className="label mt-1.5 hidden sm:block" style={{ fontSize: "0.5625rem" }}>
              {site.tagline}
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative text-[0.6875rem] uppercase tracking-[0.22em] transition-colors duration-300"
                  style={{ color: active ? "var(--accent)" : "var(--paper)" }}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-2 left-0 h-px origin-left transition-transform duration-300"
                    style={{
                      width: "100%",
                      background: "var(--accent)",
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={`/music/${featuredRelease.slug}`}
              className="btn hidden md:inline-flex"
              style={{ padding: "0.85rem 1.5rem", fontSize: "0.6875rem" }}
            >
              Listen Now
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="block h-px w-6" style={{ background: "var(--paper)" }} />
              <span className="block h-px w-6" style={{ background: "var(--paper)" }} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[70] flex flex-col"
            style={{ background: "var(--ground)" }}
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell flex items-center justify-between py-5">
              <span
                className="font-display text-xl"
                style={{ letterSpacing: "0.28em" }}
              >
                LAMMOTH
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center text-2xl"
                aria-label="Close menu"
                autoFocus
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <nav
              className="shell flex flex-1 flex-col justify-center gap-1"
              aria-label="Mobile"
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduced ? 0 : 0.18 + i * 0.06,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    className="display-lg block py-2 transition-colors duration-300"
                    style={{ color: "var(--paper)" }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduced ? 0 : 0.18 + nav.length * 0.06,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-10"
              >
                <Link href={`/music/${featuredRelease.slug}`} className="btn">
                  Listen to {featuredRelease.title}
                </Link>
              </motion.div>
            </nav>

            <div className="shell flex flex-wrap gap-x-6 gap-y-2 py-10">
              {[
                { label: "Bandcamp", url: "https://lammothofficial.bandcamp.com" },
                { label: "Instagram", url: "https://www.instagram.com/lammoth.official/" },
                { label: "Bluesky", url: "https://bsky.app/profile/lammoth.bsky.social" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap label transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
