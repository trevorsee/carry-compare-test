import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const EventSchema = z.object({
  name: z.string().min(1),
  payload: z.record(z.string(), z.unknown()).default({}),
  pagePath: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = EventSchema.parse(json);
    await prisma.event.create({
      data: {
        name: parsed.name,
        payload: parsed.payload as Prisma.InputJsonValue,
        pagePath: parsed.pagePath,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

