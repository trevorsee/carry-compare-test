import { ProviderPlan, FilterState, PlanTier } from "@/types";

export interface FilteredPlan extends ProviderPlan {
  matchingTiers: PlanTier[];
  matchScore: number;
}

export function filterPlans(
  plans: ProviderPlan[],
  filters: FilterState
): FilteredPlan[] {
  return plans
    .map((plan) => {
      const matchScore = 100;
      const matchingTiers: PlanTier[] = [];

      // Filter by state availability
      if (filters.selectedState) {
        if (plan.statesExcluded.includes(filters.selectedState)) {
          return null; // Plan not available in this state
        }
      }

      // Filter by payment style
      if (filters.paymentStyle) {
        if (plan.paymentStyle.type !== filters.paymentStyle) {
          return null;
        }
      }

      // Filter by attorney choice
      if (filters.attorneyChoice) {
        if (plan.attorneyChoice.type !== filters.attorneyChoice) {
          return null;
        }
      }

      // Filter tiers by budget and family coverage
      for (const tier of plan.tiers) {
        let tierMatches = true;

        // Check budget
        if (filters.maxMonthlyBudget !== null) {
          const price = tier.monthlyPrice.amount;
          if (price !== null && price > filters.maxMonthlyBudget) {
            tierMatches = false;
          }
        }

        // Check family coverage
        if (filters.needsFamilyCoverage) {
          if (!tier.familyCoverage.value) {
            tierMatches = false;
          }
        }

        // Check minimum coverage
        if (filters.minCoverageAmount !== null) {
          const criminalLimit = tier.coverageLimits.criminal.amount;
          // null typically means unlimited, which passes
          if (
            criminalLimit !== null &&
            criminalLimit < filters.minCoverageAmount
          ) {
            tierMatches = false;
          }
        }

        if (tierMatches) {
          matchingTiers.push(tier);
        }
      }

      // If no tiers match, exclude the plan
      if (matchingTiers.length === 0) {
        return null;
      }

      return {
        ...plan,
        matchingTiers,
        matchScore,
      };
    })
    .filter((plan): plan is FilteredPlan => plan !== null)
    .sort((a, b) => b.matchScore - a.matchScore);
}

export function getLowestPrice(plan: ProviderPlan): number | null {
  const prices = plan.tiers
    .map((t) => t.monthlyPrice.amount)
    .filter((p): p is number => p !== null);
  return prices.length > 0 ? Math.min(...prices) : null;
}

export function getHighestCoverage(plan: ProviderPlan): number | null {
  const limits = plan.tiers
    .map((t) => t.coverageLimits.criminal.amount)
    .filter((l): l is number => l !== null);
  // If any tier has null (unlimited), return null to indicate unlimited
  if (plan.tiers.some((t) => t.coverageLimits.criminal.amount === null)) {
    return null; // Unlimited
  }
  return limits.length > 0 ? Math.max(...limits) : null;
}

export function formatMoney(amount: number | null): string {
  if (amount === null) return "Unlimited";
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
  }
  return `$${amount}`;
}

export function formatMonthlyPrice(amount: number | null): string {
  if (amount === null) return "Contact for pricing";
  return `$${amount}/mo`;
}

export const defaultFilters: FilterState = {
  maxMonthlyBudget: null,
  paymentStyle: null,
  attorneyChoice: null,
  needsFamilyCoverage: false,
  selectedState: null,
  minCoverageAmount: null,
};

export function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.maxMonthlyBudget !== null) count++;
  if (filters.paymentStyle !== null) count++;
  if (filters.attorneyChoice !== null) count++;
  if (filters.needsFamilyCoverage) count++;
  if (filters.selectedState !== null) count++;
  if (filters.minCoverageAmount !== null) count++;
  return count;
}
