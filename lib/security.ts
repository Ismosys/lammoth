/**
 * Shared form defences.
 *
 * Three layers, none of which require a third party service or leak anything
 * about the visitor:
 *   1. A honeypot field that real people never see and never fill.
 *   2. A minimum time on form, since bots submit almost instantly.
 *   3. A fixed window rate limit keyed on the caller address.
 *
 * The rate limiter is in process. It is sufficient for a single instance and
 * for serverless functions that stay warm. Move it to a shared store such as
 * Vercel KV or Upstash before running multiple instances.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const MIN_FORM_TIME_MS = 2500;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_PER_WINDOW) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

/** Returns an error string when the submission looks automated. */
export function spamCheck(body: Record<string, unknown>): string | null {
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return "Submission rejected.";
  }
  const started = Number(body.startedAt);
  if (Number.isFinite(started) && Date.now() - started < MIN_FORM_TIME_MS) {
    return "Submission rejected.";
  }
  return null;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function validateEmail(value: unknown): string | null {
  if (typeof value !== "string" || value.trim() === "") return "Enter an email address.";
  if (value.length > 254) return "That email address is too long.";
  if (!EMAIL.test(value.trim())) return "Enter a valid email address.";
  return null;
}

export function validateText(
  value: unknown,
  field: string,
  { min = 1, max = 2000 }: { min?: number; max?: number } = {},
): string | null {
  if (typeof value !== "string" || value.trim().length < min) {
    return `Enter your ${field}.`;
  }
  if (value.length > max) return `That ${field} is too long.`;
  return null;
}
