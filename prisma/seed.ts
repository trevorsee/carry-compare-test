import prismaPkg from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const { PrismaClient } = prismaPkg as unknown as {
  PrismaClient: new (options: unknown) => any;
};

function sqliteFilePath(databaseUrl: string) {
  return databaseUrl.startsWith("file:") ? databaseUrl.replace(/^file:/, "") : databaseUrl;
}

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: sqliteFilePath(process.env.DATABASE_URL || "file:./dev.db"),
  }),
});

async function main() {
  // Clear (dev-safe)
  await prisma.event.deleteMany();
  await prisma.changeLog.deleteMany();
  await prisma.source.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.provider.deleteMany();

  const today = new Date();

  const providerA = await prisma.provider.create({
    data: {
      name: "Example Defense Network",
      slug: "example-defense-network",
      websiteUrl: "https://example.com",
      summaryShort: "Sample provider for MVP scaffolding.",
      disclosureNotes: "This is placeholder data for the MVP skeleton.",
    },
  });

  const planA = await prisma.plan.create({
    data: {
      providerId: providerA.id,
      name: "Standard Plan",
      slug: "example-defense-network-standard",
      priceMonthly: 19.99,
      priceAnnual: 199.0,
      paymentStyle: "upfront",
      attorneyChoice: "limited",
      waitingPeriodDays: 0,
      coverageType: "both",
      familyCoverage: "limited",
      coverageNotes:
        "Placeholder notes: confirm limits, eligibility, and exclusions with provider.",
      exclusionsNotes:
        "Placeholder exclusions: always read the member agreement/policy.",
      supportFeatures: ["24/7 hotline", "incident response"].map((t) => t),
      limitsJson: {
        defense_costs: "Not disclosed",
        civil_damages: "Not disclosed",
        bail: "Not disclosed",
      },
      availabilityJson: { national: true },
      affiliateUrl: "https://example.com/?utm_source=carrycoverage",
      ctaLabel: "Visit Provider",
      isFeatured: true,
      overallScore: 7.5,
      lastVerifiedAt: today,
      isActive: true,
      isPublished: true,
      sources: {
        create: [
          {
            url: "https://example.com/terms",
            title: "Terms & coverage details",
            note: "Primary source for plan terms (placeholder).",
          },
        ],
      },
      changeLog: {
        create: [
          {
            summary: "Seeded initial placeholder plan for MVP scaffolding.",
            changedBy: "seed",
          },
        ],
      },
    },
  });

  const providerB = await prisma.provider.create({
    data: {
      name: "Placeholder Legal Shield",
      slug: "placeholder-legal-shield",
      websiteUrl: "https://example.org",
      summaryShort: "Sample provider for MVP scaffolding.",
      disclosureNotes: "This is placeholder data for the MVP skeleton.",
    },
  });

  await prisma.plan.create({
    data: {
      providerId: providerB.id,
      name: "Budget Plan",
      slug: "placeholder-legal-shield-budget",
      priceMonthly: 12.0,
      priceAnnual: null,
      paymentStyle: "reimbursement",
      attorneyChoice: "no",
      waitingPeriodDays: 30,
      coverageType: "criminal",
      familyCoverage: "no",
      coverageNotes:
        "Placeholder notes: reimbursement timing and eligible expenses vary.",
      exclusionsNotes:
        "Placeholder exclusions: verify any state limitations and prohibited acts.",
      supportFeatures: ["member portal"].map((t) => t),
      limitsJson: { defense_costs: "Not disclosed" },
      availabilityJson: { national: "unknown" },
      affiliateUrl: "https://example.org/offer?utm_source=carrycoverage",
      ctaLabel: "Check eligibility",
      overallScore: 6.2,
      lastVerifiedAt: today,
      isActive: true,
      isPublished: true,
      sources: {
        create: [
          {
            url: "https://example.org/coverage",
            title: "Coverage page",
            note: "Primary source for plan terms (placeholder).",
          },
        ],
      },
      changeLog: {
        create: [
          {
            summary: "Seeded initial placeholder plan for MVP scaffolding.",
            changedBy: "seed",
          },
        ],
      },
    },
  });

  const providerC = await prisma.provider.create({
    data: {
      name: "Sample CCW Assist",
      slug: "sample-ccw-assist",
      websiteUrl: "https://example.net",
      summaryShort: "Sample provider for MVP scaffolding.",
      disclosureNotes: "This is placeholder data for the MVP skeleton.",
    },
  });

  await prisma.plan.create({
    data: {
      providerId: providerC.id,
      name: "Family Plus",
      slug: "sample-ccw-assist-family-plus",
      priceMonthly: null,
      priceAnnual: 299.0,
      paymentStyle: "mixed",
      attorneyChoice: "yes",
      waitingPeriodDays: 7,
      coverageType: "both",
      familyCoverage: "yes",
      coverageNotes:
        "Placeholder notes: confirm attorney selection terms and any caps.",
      exclusionsNotes:
        "Placeholder exclusions: verify any brandishing and intoxication exclusions.",
      supportFeatures: ["24/7 hotline", "attorney network", "bail support"].map(
        (t) => t,
      ),
      limitsJson: { bail: "Not disclosed", appeals: "Not disclosed" },
      availabilityJson: { national: true, notes: "Not disclosed" },
      affiliateUrl: "https://example.net/join?utm_source=carrycoverage",
      ctaLabel: "Get details",
      isFeatured: false,
      overallScore: 7.1,
      lastVerifiedAt: today,
      isActive: true,
      isPublished: true,
      sources: {
        create: [
          {
            url: "https://example.net/faq",
            title: "FAQ",
            note: "Primary source for plan terms (placeholder).",
          },
        ],
      },
      changeLog: {
        create: [
          {
            summary: "Seeded initial placeholder plan for MVP scaffolding.",
            changedBy: "seed",
          },
        ],
      },
    },
  });

  // Keep unused var lint happy if you expand later.
  void planA;
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

