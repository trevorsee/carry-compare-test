import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  });

  const planUrls = plans.map((plan) => ({
    url: `https://carrycoverage.com/plans/${plan.slug}`,
    lastModified: plan.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://carrycoverage.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://carrycoverage.com/compare',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://carrycoverage.com/methodology',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://carrycoverage.com/guides',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...planUrls,
  ];
}
