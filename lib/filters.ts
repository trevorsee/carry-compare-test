import { Plan, FilterConstraints } from './types';

export function filterPlans(plans: Plan[], constraints: FilterConstraints): Plan[] {
  return plans.filter(plan => {
    // Price filters
    if (constraints.maxMonthlyPrice !== undefined) {
      const monthlyPrice = plan.monthlyPrice.value;
      if (typeof monthlyPrice === 'number' && monthlyPrice > constraints.maxMonthlyPrice) {
        return false;
      }
    }

    if (constraints.maxAnnualPrice !== undefined) {
      const annualPrice = plan.annualPrice.value;
      if (typeof annualPrice === 'number' && annualPrice > constraints.maxAnnualPrice) {
        return false;
      }
    }

    // Payment style filter
    if (constraints.paymentStyle && constraints.paymentStyle.length > 0) {
      if (!constraints.paymentStyle.includes(plan.paymentStyle)) {
        return false;
      }
    }

    // Attorney choice filter
    if (constraints.attorneyChoice && constraints.attorneyChoice.length > 0) {
      if (!constraints.attorneyChoice.includes(plan.attorneyChoice)) {
        return false;
      }
    }

    // Family coverage filter
    if (constraints.familyCoverage !== undefined) {
      const hasFamilyCoverage = plan.familyCoverage.value === true;
      if (hasFamilyCoverage !== constraints.familyCoverage) {
        return false;
      }
    }

    // Coverage limit filter
    if (constraints.minCoverageLimit !== undefined) {
      const limit = plan.coverageLimit.value;
      if (limit === null || limit === 'unlimited') {
        // Pass through if unlimited or not disclosed
        return true;
      }
      if (typeof limit === 'number' && limit < constraints.minCoverageLimit) {
        return false;
      }
    }

    return true;
  });
}
