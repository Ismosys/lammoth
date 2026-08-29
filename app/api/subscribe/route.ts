import { NextResponse } from "next/server";
import {
  clientKey,
  rateLimit,
  spamCheck,
  validateEmail,
} from "@/lib/security";

export async function POST(request: Request) {
  const limit = rateLimit(`subscribe:${clientKey(request)}`);
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

  const emailError = validateEmail(body.email);
  if (emailError) return NextResponse.json({ error: emailError }, { status: 400 });

  const email = String(body.email).trim().toLowerCase();

  /*
    Delivery is intentionally not wired to a provider yet, so no address is sent
    anywhere until the owner chooses one. Connect a list here (Buttondown, Resend
    Audiences, Mailchimp) using a server side key from the environment.
  */
  if (!process.env.NEWSLETTER_API_KEY) {
    console.info("[subscribe] pending provider configuration:", email);
    return NextResponse.json({
      ok: true,
      message: "Thank you. You are on the list.",
    });
  }

  return NextResponse.json({ ok: true, message: "Thank you. You are on the list." });
}
