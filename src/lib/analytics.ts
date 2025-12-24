// Analytics event tracking
// Uses navigator.sendBeacon for reliable outbound click tracking

export interface AnalyticsEvent {
  event: string;
  properties: Record<string, unknown>;
  timestamp: number;
}

export function trackEvent(event: string, properties: Record<string, unknown> = {}) {
  const eventData: AnalyticsEvent = {
    event,
    properties: {
      ...properties,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
    },
    timestamp: Date.now(),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventData);
  }

  // In production, send to analytics endpoint
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    try {
      navigator.sendBeacon('/api/analytics', JSON.stringify(eventData));
    } catch {
      // Fallback to fetch
      fetch('/api/analytics', {
        method: 'POST',
        body: JSON.stringify(eventData),
        keepalive: true,
      }).catch(() => {});
    }
  }
}

// Specific event helpers
export function trackFilterChange(filterName: string, value: unknown, resultsCount: number) {
  trackEvent('filter_change', { filter_name: filterName, value, results_count: resultsCount });
}

export function trackSortChange(sortKey: string) {
  trackEvent('sort_change', { sort_key: sortKey });
}

export function trackCompareAdd(planId: string, providerId: string, providerName: string) {
  trackEvent('compare_add', { plan_id: planId, provider_id: providerId, provider_name: providerName });
}

export function trackCompareRemove(planId: string) {
  trackEvent('compare_remove', { plan_id: planId });
}

export function trackCompareView(planIds: string[]) {
  trackEvent('compare_view', { plan_ids: planIds });
}

export function trackOutboundClick(
  providerId: string,
  planId: string,
  placement: 'table' | 'provider' | 'compare',
  positionIndex: number,
  ctaLabel: string
) {
  trackEvent('outbound_click', {
    provider_id: providerId,
    plan_id: planId,
    placement,
    position_index: positionIndex,
    cta_label: ctaLabel,
  });
}

export function trackMethodologyView() {
  trackEvent('methodology_view', {});
}
