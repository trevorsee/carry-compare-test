import { MetadataRoute } from 'next';
import prisma from '@/lib/db';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://carrycoverage.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all active plans
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  });

  // Get all published guides
  const guides = await prisma.guide.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  });

  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/compare', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/guides', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/methodology', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/disclosure', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  const staticEntries = staticPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Plan pages
  const planEntries = plans.map((plan) => ({
    url: `${BASE_URL}/plans/${plan.slug}`,
    lastModified: plan.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Guide pages
  const guideEntries = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: guide.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...planEntries, ...guideEntries];
}
