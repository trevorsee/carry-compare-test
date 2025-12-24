import { prisma } from "@/lib/prisma";

export async function getPublishedPlans() {
  return prisma.plan.findMany({
    where: { isActive: true, isPublished: true, provider: { isActive: true } },
    include: { provider: true, sources: true },
  });
}

export async function getPlanBySlug(slug: string) {
  return prisma.plan.findFirst({
    where: { slug, isActive: true, isPublished: true, provider: { isActive: true } },
    include: { provider: true, sources: true, changeLog: { orderBy: { changedAt: "desc" }, take: 25 } },
  });
}

export async function getPlansByIds(ids: string[]) {
  return prisma.plan.findMany({
    where: { id: { in: ids }, isActive: true, isPublished: true, provider: { isActive: true } },
    include: { provider: true, sources: true },
  });
}

export async function getAllPlanSlugs() {
  const rows = await prisma.plan.findMany({
    where: { isActive: true, isPublished: true, provider: { isActive: true } },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

