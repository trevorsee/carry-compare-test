-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "website_url" TEXT NOT NULL,
    "logo_url" TEXT,
    "summary_short" TEXT,
    "summary_long" TEXT,
    "disclosure_notes" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price_monthly" DECIMAL,
    "price_annual" DECIMAL,
    "payment_style" TEXT NOT NULL DEFAULT 'unknown',
    "attorney_choice" TEXT NOT NULL DEFAULT 'unknown',
    "waiting_period_days" INTEGER,
    "coverage_type" TEXT NOT NULL DEFAULT 'unknown',
    "family_coverage" TEXT NOT NULL DEFAULT 'unknown',
    "coverage_notes" TEXT,
    "exclusions_notes" TEXT,
    "support_features" TEXT,
    "limits_json" TEXT,
    "availability_json" TEXT,
    "affiliate_url" TEXT,
    "cta_label" TEXT DEFAULT 'Visit Provider',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "sponsored_rank_position" INTEGER,
    "overall_score" DECIMAL,
    "score_breakdown_json" TEXT,
    "last_verified_at" DATETIME,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Plan_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "Provider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plan_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "note" TEXT,
    "captured_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Source_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChangeLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plan_id" TEXT NOT NULL,
    "changed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changed_by" TEXT,
    "summary" TEXT,
    "diff_json" TEXT,
    CONSTRAINT "ChangeLog_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Provider_slug_key" ON "Provider"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_slug_key" ON "Plan"("slug");
