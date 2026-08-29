"use client";

import { useEffect, useRef, useState } from "react";
import { contactCategories } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "subject" | "message" | "category", string>>;

const fieldStyle = {
  borderBottom: "1px solid var(--line)",
  color: "var(--paper)",
} as const;

export default function ContactForm() {
  const [category, setCategory] = useState(contactCategories[0].value);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const startedAt = useRef(Date.now());

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrors({});
    setFeedback("");

    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      category,
      website: String(data.get("website") ?? ""),
      startedAt: startedAt.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        setState("error");
        if (json.errors) setErrors(json.errors);
        setFeedback(json.error ?? "Please check the fields above.");
        return;
      }

      setState("done");
      setFeedback(json.message);
      e.currentTarget.reset();
    } catch {
      setState("error");
      setFeedback("Network problem. Try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="border-0 p-0">
        <legend className="label mb-5">What is this about</legend>
        <div className="flex flex-wrap gap-3">
          {contactCategories.map((c) => {
            const on = category === c.value;
            return (
              <label
                key={c.value}
                className="cursor-pointer px-4 py-3 text-xs uppercase tracking-[0.16em] transition-colors duration-300"
                style={{
                  border: `1px solid ${on ? "var(--accent)" : "var(--line)"}`,
                  color: on ? "var(--ground)" : "var(--paper)",
                  background: on ? "var(--accent)" : "transparent",
                }}
              >
                <input
                  type="radio"
                  name="category"
                  value={c.value}
                  checked={on}
                  onChange={() => setCategory(c.value)}
                  className="sr-only"
                />
                {c.label}
              </label>
            );
          })}
        </div>
        <p className="body-copy mt-4 text-sm">
          {contactCategories.find((c) => c.value === category)?.description}
        </p>
      </fieldset>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label block">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="mt-3 w-full bg-transparent px-0 py-3 outline-none"
            style={fieldStyle}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm" style={{ color: "#E4785F" }}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="label block">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="mt-3 w-full bg-transparent px-0 py-3 outline-none"
            style={fieldStyle}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm" style={{ color: "#E4785F" }}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10">
        <label htmlFor="subject" className="label block">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className="mt-3 w-full bg-transparent px-0 py-3 outline-none"
          style={fieldStyle}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-2 text-sm" style={{ color: "#E4785F" }}>
            {errors.subject}
          </p>
        )}
      </div>

      <div className="mt-10">
        <label htmlFor="message" className="label block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-3 w-full resize-y bg-transparent px-0 py-3 outline-none"
          style={fieldStyle}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm" style={{ color: "#E4785F" }}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? "Sending" : "Send Message"}
        </button>
        <p
          role="status"
          aria-live="polite"
          className="text-sm"
          style={{ color: state === "error" ? "#E4785F" : "var(--accent)" }}
        >
          {feedback}
        </p>
      </div>
    </form>
  );
}
