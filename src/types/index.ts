// Core types for the Concealed Carry Legal Protection Comparison Tool

export type PaymentStyle = "upfront" | "reimbursement" | "hybrid";
export type AttorneyChoice = "your_choice" | "panel_only" | "panel_preferred";
export type CoverageScope = "criminal" | "civil" | "both";
export type DisclosureStatus = "confirmed" | "not_disclosed" | "unclear";

export interface MoneyValue {
  amount: number | null;
  disclosed: DisclosureStatus;
  notes?: string;
}

export interface BooleanValue {
  value: boolean | null;
  disclosed: DisclosureStatus;
  notes?: string;
}

export interface StringValue {
  value: string | null;
  disclosed: DisclosureStatus;
  notes?: string;
}

export interface CoverageLimit {
  criminal: MoneyValue;
  civil: MoneyValue;
  combined?: MoneyValue;
  perIncident?: MoneyValue;
  annual?: MoneyValue;
  lifetime?: MoneyValue;
}

export interface PlanTier {
  id: string;
  name: string;
  monthlyPrice: MoneyValue;
  annualPrice: MoneyValue;
  coverageLimits: CoverageLimit;
  familyCoverage: BooleanValue;
  familyAdditionalCost?: MoneyValue;
  multiStateProtection: BooleanValue;
  bailBond: MoneyValue;
  expertWitnessCoverage: BooleanValue;
  psychologicalSupport: BooleanValue;
  gunReplacement: BooleanValue;
  civilSuitDefense: BooleanValue;
  features: string[];
}

export interface Exclusion {
  category: string;
  description: string;
  severity: "critical" | "important" | "minor";
  disclosed: DisclosureStatus;
  notes?: string;
}

export interface ProviderPlan {
  id: string;
  name: string;
  shortName: string;
  website: string;
  description: string;
  
  // Core decision attributes
  paymentStyle: {
    type: PaymentStyle;
    disclosed: DisclosureStatus;
    description: string;
  };
  
  attorneyChoice: {
    type: AttorneyChoice;
    disclosed: DisclosureStatus;
    description: string;
  };
  
  coverageScope: {
    type: CoverageScope;
    disclosed: DisclosureStatus;
  };
  
  // Plan tiers
  tiers: PlanTier[];
  
  // What this plan is good/not good for
  bestFor: string[];
  notIdealFor: string[];
  
  // Exclusions and limitations
  exclusions: Exclusion[];
  waitingPeriod: StringValue;
  
  // Geographic coverage
  statesAvailable: string[] | "all";
  statesExcluded: string[];
  
  // Company info
  yearsInBusiness: number | null;
  memberCount: StringValue;
  
  // Trust signals
  sources: Source[];
  lastVerified: string;
  
  // Affiliate info
  isSponsored: boolean;
  affiliateDisclosure?: string;
}

export interface Source {
  name: string;
  url: string;
  accessDate: string;
  type: "official" | "third_party" | "user_reported";
}

export interface FilterState {
  maxMonthlyBudget: number | null;
  paymentStyle: PaymentStyle | null;
  attorneyChoice: AttorneyChoice | null;
  needsFamilyCoverage: boolean;
  selectedState: string | null;
  minCoverageAmount: number | null;
}

export interface ComparisonState {
  selectedPlanIds: string[];
}

// Analytics event types
export type AnalyticsEventType =
  | "filter_applied"
  | "filter_cleared"
  | "plan_viewed"
  | "comparison_started"
  | "comparison_viewed"
  | "outbound_click"
  | "education_content_viewed"
  | "exclusion_expanded"
  | "source_clicked";

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  timestamp: Date;
  data: Record<string, unknown>;
}
