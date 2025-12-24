import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ComparePlan {
  id: string;
  name: string;
  providerName: string;
  slug: string;
}

interface CompareStore {
  selectedPlans: ComparePlan[];
  addPlan: (plan: ComparePlan) => void;
  removePlan: (planId: string) => void;
  clearPlans: () => void;
  isSelected: (planId: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      selectedPlans: [],
      addPlan: (plan) => {
        const current = get().selectedPlans;
        if (current.length >= 4) return;
        if (current.some((p) => p.id === plan.id)) return;
        set({ selectedPlans: [...current, plan] });
      },
      removePlan: (planId) => {
        set({ selectedPlans: get().selectedPlans.filter((p) => p.id !== planId) });
      },
      clearPlans: () => {
        set({ selectedPlans: [] });
      },
      isSelected: (planId) => {
        return get().selectedPlans.some((p) => p.id === planId);
      },
    }),
    {
      name: 'compare-plans',
    }
  )
);

// Filter state
export interface FilterState {
  priceRange: [number, number];
  paymentStyle: string[];
  attorneyChoice: string[];
  coverageType: string[];
  familyCoverage: string[];
  waitingPeriod: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface FilterStore {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  activePreset: string | null;
  setPreset: (preset: string | null) => void;
}

const defaultFilters: FilterState = {
  priceRange: [0, 100],
  paymentStyle: [],
  attorneyChoice: [],
  coverageType: [],
  familyCoverage: [],
  waitingPeriod: '',
  sortBy: 'overallScore',
  sortOrder: 'desc',
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: defaultFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      activePreset: null,
    })),
  resetFilters: () => set({ filters: defaultFilters, activePreset: null }),
  activePreset: null,
  setPreset: (preset) => set({ activePreset: preset }),
}));
