// Core data types for concealed carry legal protection plans

export type PaymentStyle = 'upfront' | 'reimbursement' | 'hybrid';
export type AttorneyChoice = 'network' | 'choice' | 'hybrid';
export type DisclosureStatus = 'disclosed' | 'not_disclosed' | 'unclear';

export interface PlanAttribute {
  value: string | number | boolean | null;
  status: DisclosureStatus;
  source?: string;
  lastVerified?: string;
}

export interface Plan {
  id: string;
  name: string;
  provider: string;
  description: string;
  
  // Key decision attributes
  monthlyPrice: PlanAttribute;
  annualPrice: PlanAttribute;
  paymentStyle: PaymentStyle;
  attorneyChoice: AttorneyChoice;
  familyCoverage: PlanAttribute; // boolean
  coverageLimit: PlanAttribute; // number or 'unlimited'
  waitingPeriod: PlanAttribute; // number (days)
  
  // Coverage details
  coversCivil: PlanAttribute;
  coversCriminal: PlanAttribute;
  coversBail: PlanAttribute;
  coversExpertWitness: PlanAttribute;
  
  // Exclusions and limitations
  exclusions: string[];
  limitations: string[];
  notIdealFor: string[];
  
  // Best for
  bestFor: string[];
  
  // Metadata
  source: string;
  lastVerified: string;
  sponsored?: boolean;
  affiliateLink?: string;
  providerLink: string;
  
  // Additional notes
  notes?: string;
}

export interface FilterConstraints {
  maxMonthlyPrice?: number;
  maxAnnualPrice?: number;
  paymentStyle?: PaymentStyle[];
  attorneyChoice?: AttorneyChoice[];
  familyCoverage?: boolean;
  state?: string;
  minCoverageLimit?: number;
}

export interface ComparisonPlan extends Plan {
  comparisonId: string; // For tracking in comparison view
}
