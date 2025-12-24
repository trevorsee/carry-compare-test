// Analytics tracking functions
// In production, this would integrate with your analytics provider (GA4, Plausible, etc.)

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Placeholder for analytics integration
  if (typeof window !== 'undefined') {
    console.log('[Analytics]', eventName, properties);
    // Example: window.gtag?.('event', eventName, properties);
  }
}

export const AnalyticsEvents = {
  FILTER_APPLIED: 'filter_applied',
  COMPARISON_STARTED: 'comparison_started',
  PLAN_VIEWED: 'plan_viewed',
  PROVIDER_CLICKED: 'provider_clicked',
  EDUCATIONAL_CONTENT_VIEWED: 'educational_content_viewed',
  CONSTRAINT_SET: 'constraint_set',
  COMPARISON_VIEWED: 'comparison_viewed',
  EXCLUSIONS_VIEWED: 'exclusions_viewed',
} as const;
