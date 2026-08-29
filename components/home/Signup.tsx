"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "sending" | "done" | "error";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [feedback, setFeedback] = useState("");
  const startedAt = useRef(Date.now());

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setFeedback("");

    const form = e.target as HTMLFormElement;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: honeypot,
          startedAt: startedAt.current,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setFeedback(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setState("done");
      setFeedback(data.message);
      setEmail("");
    } catch {
      setState("error");
      setFeedback("Network problem. Try again.");
    }
  }

  return (
    <section className="section" aria-labelledby="signup-heading">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label">Join the Journey</p>
            <h2 id="signup-heading" className="display-md mt-6">
              Word from the road
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="body-copy">
              Get updates on new releases, future projects, and official
              announcements.
            </p>

            <form onSubmit={onSubmit} className="mt-9" noValidate>
              {/* Honeypot. Hidden from people, tempting to bots. */}
              <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <label htmlFor="signup-email" className="label block">
                Email address
              </label>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="signup-feedback"
                  aria-invalid={state === "error"}
                  className="flex-1 bg-transparent px-0 py-4 text-lg outline-none transition-colors duration-300"
                  style={{
                    borderBottom: "1px solid var(--line)",
                    color: "var(--paper)",
                  }}
                  placeholder="you@example.com"
                />
                <button
                  type="submit"
                  className="btn shrink-0"
                  disabled={state === "sending"}
                  style={{ opacity: state === "sending" ? 0.6 : 1 }}
                >
                  {state === "sending" ? "Sending" : "Join"}
                </button>
              </div>

              <p
                id="signup-feedback"
                role="status"
                aria-live="polite"
                className="mt-4 text-sm"
                style={{
                  color: state === "error" ? "#E4785F" : "var(--accent)",
                  minHeight: "1.25rem",
                }}
              >
                {feedback}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
