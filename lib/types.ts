import { 
  PaymentStyle, 
  AttorneyChoice, 
  CoverageType, 
  FamilyCoverage 
} from '@prisma/client';

export type { PaymentStyle, AttorneyChoice, CoverageType, FamilyCoverage };

export interface PlanWithProvider {
  id: string;
  name: string;
  slug: string;
  priceMonthly: number | null;
  priceAnnual: number | null;
  paymentStyle: PaymentStyle;
  attorneyChoice: AttorneyChoice;
  waitingPeriodDays: number | null;
  coverageType: CoverageType;
  familyCoverage: FamilyCoverage;
  coverageNotes: string | null;
  exclusionsNotes: string | null;
  supportFeatures: any;
  limitsJson: any;
  availabilityJson: any;
  affiliateUrl: string | null;
  ctaLabel: string | null;
  isFeatured: boolean;
  sponsoredRankPosition: number | null;
  overallScore: number | null;
  scoreBreakdownJson: any;
  lastVerifiedAt: Date | null;
  provider: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
  };
  _count: {
    sources: number;
  };
}

export interface FilterState {
  paymentStyle?: PaymentStyle[];
  attorneyChoice?: AttorneyChoice[];
  coverageType?: CoverageType[];
  familyCoverage?: FamilyCoverage[];
  priceRange?: { min?: number; max?: number };
  state?: string;
}

export type SortOption = 
  | 'price-low-high'
  | 'price-high-low'
  | 'score-high-low'
  | 'name-asc'
  | 'name-desc';
