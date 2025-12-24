import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const OutboundClickSchema = z.object({
  provider_id: z.string().min(1),
  plan_id: z.string().min(1),
  placement: z.enum(["table", "provider", "compare"]),
  page_path: z.string().min(1),
  position_index: z.number().int().nonnegative().optional(),
  cta_label: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const payload = OutboundClickSchema.parse(json);
    await prisma.event.create({
      data: {
        name: "outbound_click",
        payload: payload as unknown as Prisma.InputJsonValue,
        pagePath: payload.page_path,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

