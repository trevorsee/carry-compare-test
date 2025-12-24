// Seed script for sample data
// Run with: npx tsx scripts/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample providers
  const provider1 = await prisma.provider.upsert({
    where: { slug: 'uscca' },
    update: {},
    create: {
      name: 'USCCA',
      slug: 'uscca',
      websiteUrl: 'https://www.uscca.com',
      summaryShort: 'Comprehensive self-defense legal protection with up-front coverage.',
      summaryLong: 'USCCA provides comprehensive self-defense legal protection plans with up-front coverage, attorney choice, and extensive support services.',
      isActive: true,
    },
  });

  const provider2 = await prisma.provider.upsert({
    where: { slug: 'ccwsafe' },
    update: {},
    create: {
      name: 'CCW Safe',
      slug: 'ccwsafe',
      websiteUrl: 'https://www.ccwsafe.com',
      summaryShort: 'Up-front legal protection with nationwide coverage.',
      summaryLong: 'CCW Safe offers up-front legal protection plans with nationwide coverage and attorney choice.',
      isActive: true,
    },
  });

  // Create sample plans
  const plan1 = await prisma.plan.upsert({
    where: { slug: 'uscca-gold' },
    update: {},
    create: {
      name: 'USCCA Gold',
      slug: 'uscca-gold',
      providerId: provider1.id,
      priceMonthly: 29.95,
      priceAnnual: 299.00,
      paymentStyle: 'upfront',
      attorneyChoice: 'yes',
      coverageType: 'both',
      familyCoverage: 'yes',
      waitingPeriodDays: 0,
      coverageNotes: 'Comprehensive coverage including criminal defense, civil liability, bail bond coverage, and appeals.',
      exclusionsNotes: 'Excludes intentional criminal acts and incidents involving alcohol or drugs.',
      affiliateUrl: 'https://www.uscca.com/gold',
      ctaLabel: 'Visit USCCA',
      isFeatured: true,
      overallScore: 9.0,
      lastVerifiedAt: new Date(),
      isActive: true,
    },
  });

  const plan2 = await prisma.plan.upsert({
    where: { slug: 'ccwsafe-premier' },
    update: {},
    create: {
      name: 'CCW Safe Premier',
      slug: 'ccwsafe-premier',
      providerId: provider2.id,
      priceMonthly: 34.95,
      priceAnnual: 349.00,
      paymentStyle: 'upfront',
      attorneyChoice: 'yes',
      coverageType: 'both',
      familyCoverage: 'limited',
      waitingPeriodDays: 0,
      coverageNotes: 'Up-front coverage for criminal defense and civil liability with attorney choice.',
      exclusionsNotes: 'Limited family coverage. Excludes pre-existing incidents.',
      affiliateUrl: 'https://www.ccwsafe.com/premier',
      ctaLabel: 'Visit CCW Safe',
      isFeatured: true,
      overallScore: 8.5,
      lastVerifiedAt: new Date(),
      isActive: true,
    },
  });

  // Create sample sources
  await prisma.source.upsert({
    where: { id: 'source1' },
    update: {},
    create: {
      id: 'source1',
      planId: plan1.id,
      url: 'https://www.uscca.com/terms',
      title: 'USCCA Terms of Service',
      note: 'Official terms document',
    },
  });

  await prisma.source.upsert({
    where: { id: 'source2' },
    update: {},
    create: {
      id: 'source2',
      planId: plan2.id,
      url: 'https://www.ccwsafe.com/terms',
      title: 'CCW Safe Terms of Service',
      note: 'Official terms document',
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
