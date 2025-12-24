import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareTable, type ComparePlanRow } from "@/components/CompareTable";
import { getPublishedPlans } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Compare plans",
  alternates: { canonical: "/compare" },
};

export default async function ComparePage() {
  const plans = await getPublishedPlans();
  const rows: ComparePlanRow[] = plans.map((p) => {
    const availability = (p.availabilityJson as any)?.national;
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      providerId: p.providerId,
      providerName: p.provider.name,
      providerWebsiteUrl: p.provider.websiteUrl,
      priceMonthly: p.priceMonthly,
      priceAnnual: p.priceAnnual,
      paymentStyle: p.paymentStyle,
      attorneyChoice: p.attorneyChoice,
      waitingPeriodDays: p.waitingPeriodDays,
      coverageType: p.coverageType,
      familyCoverage: p.familyCoverage,
      affiliateUrl: p.affiliateUrl,
      ctaLabel: p.ctaLabel,
      isFeatured: p.isFeatured,
      isSponsored: p.isSponsored,
      sponsoredRankPosition: p.sponsoredRankPosition,
      overallScore: p.overallScore,
      lastVerifiedAt: p.lastVerifiedAt ? p.lastVerifiedAt.toISOString().slice(0, 10) : null,
      availabilityNational:
        availability === true ? true : availability === false ? false : "unknown",
    };
  });

  return (
    <Suspense fallback={<div className="text-sm text-slate-600">Loading…</div>}>
      <CompareTable plans={rows} />
    </Suspense>
  );
}

