import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email and message are required." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    try {
      await db.contactMessage.create({
        data: {
          name: name.slice(0, 120),
          email: email.slice(0, 160),
          subject: (subject || "General Inquiry").slice(0, 160),
          message: message.slice(0, 5000),
        },
      });
    } catch {
      // DB write is best-effort; we still respond OK so the UX is smooth.
      console.error("[contact] Failed to persist message to DB");
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks for reaching out! Your message has been received.",
    });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Contact endpoint is live. Send a POST with { name, email, subject, message }.",
  });
}
