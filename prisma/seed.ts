import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // USCCA
  const uscca = await prisma.provider.create({
    data: {
      name: 'USCCA',
      slug: 'uscca',
      website_url: 'https://www.usconcealedcarry.com/',
      summary_short: 'Popular choice with comprehensive training and education resources.',
      plans: {
        create: [
          {
            name: 'Gold',
            slug: 'uscca-gold',
            price_monthly: 29.00,
            price_annual: 299.00,
            payment_style: 'upfront',
            attorney_choice: 'no', // Network attorney usually
            coverage_type: 'both',
            family_coverage: 'limited', // Spouse optional add-on often
            cta_label: 'View Details',
            is_featured: true,
            sponsored_rank_position: 1,
            overall_score: 4.5,
            last_verified_at: new Date(),
          },
          {
            name: 'Platinum',
            slug: 'uscca-platinum',
            price_monthly: 39.00,
            price_annual: 399.00,
            payment_style: 'upfront',
            attorney_choice: 'no',
            coverage_type: 'both',
            last_verified_at: new Date(),
          }
        ]
      }
    }
  });

  // CCW Safe
  const ccwSafe = await prisma.provider.create({
    data: {
      name: 'CCW Safe',
      slug: 'ccw-safe',
      website_url: 'https://ccwsafe.com/',
      summary_short: 'Focus on legal defense with unlimited coverage limits on many plans.',
      plans: {
        create: [
          {
            name: 'Defender',
            slug: 'ccw-safe-defender',
            price_monthly: 19.00, // Approx
            price_annual: 209.00,
            payment_style: 'upfront',
            attorney_choice: 'yes', // Allowed to choose own attorney usually
            coverage_type: 'criminal', // Primarily defense
            family_coverage: 'yes', // Spouse plans available
            cta_label: 'Get Covered',
            is_featured: false,
            overall_score: 4.7,
            last_verified_at: new Date(),
          }
        ]
      }
    }
  });

  // US LawShield
  const usLawShield = await prisma.provider.create({
    data: {
      name: 'U.S. LawShield',
      slug: 'us-lawshield',
      website_url: 'https://www.uslawshield.com/',
      summary_short: 'Affordable coverage with extensive 50-state add-on options.',
      plans: {
        create: [
          {
            name: 'Individual',
            slug: 'us-lawshield-individual',
            price_monthly: 10.95,
            price_annual: 131.40,
            payment_style: 'upfront',
            attorney_choice: 'no',
            coverage_type: 'both',
            family_coverage: 'no',
            cta_label: 'Join Now',
            is_featured: false,
            overall_score: 4.2,
            last_verified_at: new Date(),
          }
        ]
      }
    }
  });

  console.log({ uscca, ccwSafe, usLawShield });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
