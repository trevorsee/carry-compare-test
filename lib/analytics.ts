// Analytics event tracking utility

export interface OutboundClickEvent {
  provider_id: string;
  plan_id: string;
  placement: 'table' | 'provider' | 'compare';
  page_path: string;
  position_index?: number;
  cta_label?: string;
}

export interface FilterChangeEvent {
  filter_name: string;
  value: string | string[];
  results_count: number;
}

export interface SortChangeEvent {
  sort_key: string;
}

export interface CompareEvent {
  plan_id: string;
  provider_id: string;
}

export function trackOutboundClick(event: OutboundClickEvent) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if ((window as any).gtag) {
    (window as any).gtag('event', 'outbound_click', {
      provider_id: event.provider_id,
      plan_id: event.plan_id,
      placement: event.placement,
      page_path: event.page_path,
      position_index: event.position_index,
      cta_label: event.cta_label,
    });
  }

  // Send beacon for reliability
  if (navigator.sendBeacon) {
    const data = JSON.stringify({
      event: 'outbound_click',
      ...event,
      timestamp: new Date().toISOString(),
    });
    navigator.sendBeacon('/api/analytics', data);
  }
}

export function trackFilterChange(event: FilterChangeEvent) {
  if (typeof window === 'undefined') return;

  if ((window as any).gtag) {
    (window as any).gtag('event', 'filter_change', {
      filter_name: event.filter_name,
      value: event.value,
      results_count: event.results_count,
    });
  }
}

export function trackSortChange(event: SortChangeEvent) {
  if (typeof window === 'undefined') return;

  if ((window as any).gtag) {
    (window as any).gtag('event', 'sort_change', {
      sort_key: event.sort_key,
    });
  }
}

export function trackCompareAdd(event: CompareEvent) {
  if (typeof window === 'undefined') return;

  if ((window as any).gtag) {
    (window as any).gtag('event', 'compare_add', {
      plan_id: event.plan_id,
      provider_id: event.provider_id,
    });
  }
}

export function trackCompareRemove(event: CompareEvent) {
  if (typeof window === 'undefined') return;

  if ((window as any).gtag) {
    (window as any).gtag('event', 'compare_remove', {
      plan_id: event.plan_id,
      provider_id: event.provider_id,
    });
  }
}

export function trackCompareView(planIds: string[]) {
  if (typeof window === 'undefined') return;

  if ((window as any).gtag) {
    (window as any).gtag('event', 'compare_view', {
      plan_ids: planIds.join(','),
    });
  }
}

export function trackMethodologyView() {
  if (typeof window === 'undefined') return;

  if ((window as any).gtag) {
    (window as any).gtag('event', 'methodology_view', {
      page_path: window.location.pathname,
    });
  }
}
