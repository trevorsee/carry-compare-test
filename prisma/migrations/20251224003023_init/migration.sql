-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "logoUrl" TEXT,
    "summaryShort" TEXT,
    "summaryLong" TEXT,
    "disclosureNotes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "providerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "priceMonthly" REAL,
    "priceAnnual" REAL,
    "paymentStyle" TEXT NOT NULL DEFAULT 'unknown',
    "attorneyChoice" TEXT NOT NULL DEFAULT 'unknown',
    "waitingPeriodDays" INTEGER,
    "coverageType" TEXT NOT NULL DEFAULT 'unknown',
    "familyCoverage" TEXT NOT NULL DEFAULT 'unknown',
    "coverageNotes" TEXT,
    "exclusionsNotes" TEXT,
    "supportFeatures" JSONB,
    "limitsJson" JSONB,
    "availabilityJson" JSONB,
    "affiliateUrl" TEXT,
    "ctaLabel" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isSponsored" BOOLEAN NOT NULL DEFAULT false,
    "sponsoredRankPosition" INTEGER,
    "overallScore" REAL,
    "scoreBreakdownJson" JSONB,
    "lastVerifiedAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Plan_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "planId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "note" TEXT,
    "capturedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Source_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChangeLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "planId" TEXT NOT NULL,
    "changedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedBy" TEXT,
    "summary" TEXT NOT NULL,
    "diffJson" JSONB,
    CONSTRAINT "ChangeLog_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "pagePath" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Provider_slug_key" ON "Provider"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_slug_key" ON "Plan"("slug");

-- CreateIndex
CREATE INDEX "Plan_providerId_idx" ON "Plan"("providerId");

-- CreateIndex
CREATE INDEX "Plan_isActive_isPublished_idx" ON "Plan"("isActive", "isPublished");

-- CreateIndex
CREATE INDEX "Source_planId_idx" ON "Source"("planId");

-- CreateIndex
CREATE INDEX "ChangeLog_planId_changedAt_idx" ON "ChangeLog"("planId", "changedAt");
