import type { MetadataRoute } from "next";
import { getGuideSlugs } from "@/lib/guides";
import { getAllPlanSlugs } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";

  const [planSlugs, guideSlugs] = await Promise.all([getAllPlanSlugs(), getGuideSlugs()]);
  const now = new Date();

  const staticRoutes = ["/compare", "/methodology", "/disclosures", "/guides"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
  }));

  const planRoutes = planSlugs.map((slug) => ({
    url: `${base}/plans/${slug}`,
    lastModified: now,
  }));

  const guideRoutes = guideSlugs.map((slug) => ({
    url: `${base}/guides/${slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...planRoutes, ...guideRoutes];
}

