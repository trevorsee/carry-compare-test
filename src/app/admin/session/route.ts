import { NextResponse } from "next/server";
import { z } from "zod";
import { COOKIE_NAME } from "@/lib/adminAuth";

const BodySchema = z.object({ token: z.string().min(1) });

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { token } = BodySchema.parse(json);
    if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}

