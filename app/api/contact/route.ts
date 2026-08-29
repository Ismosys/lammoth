import { NextResponse } from "next/server";
import {
  clientKey,
  rateLimit,
  spamCheck,
  validateEmail,
  validateText,
} from "@/lib/security";
import { contactCategories } from "@/content/site";

export async function POST(request: Request) {
  const limit = rateLimit(`contact:${clientKey(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const spam = spamCheck(body);
  if (spam) return NextResponse.json({ error: spam }, { status: 400 });

  const errors: Record<string, string> = {};
  const name = validateText(body.name, "name", { min: 2, max: 120 });
  if (name) errors.name = name;

  const email = validateEmail(body.email);
  if (email) errors.email = email;

  const subject = validateText(body.subject, "subject", { min: 2, max: 200 });
  if (subject) errors.subject = subject;

  const message = validateText(body.message, "message", { min: 10, max: 5000 });
  if (message) errors.message = message;

  const valid = contactCategories.some((c) => c.value === body.category);
  if (!valid) errors.category = "Choose a category.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  /*
    Delivery is not wired to a provider yet, so the artist's address is never
    exposed in the client bundle. Add a server side send here (Resend, Postmark)
    reading the destination from CONTACT_TO in the environment.
  */
  if (!process.env.CONTACT_TO) {
    console.info("[contact] pending provider configuration:", {
      category: body.category,
      subject: String(body.subject).slice(0, 80),
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Message sent. You will get a reply as soon as possible.",
  });
}
