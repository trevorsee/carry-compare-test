type EventType = 'filter_used' | 'compare_viewed' | 'outbound_click';

interface AnalyticsEvent {
  action: EventType;
  category?: string;
  label?: string;
  value?: number;
}

export const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
  // In a real app, this would send data to GA4, Mixpanel, etc.
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${action}:`, { category, label, value });
  }
  
  // Example for Google Analytics (if window.gtag exists)
  // if (typeof window !== 'undefined' && (window as any).gtag) {
  //   (window as any).gtag('event', action, {
  //     event_category: category,
  //     event_label: label,
  //     value: value
  //   });
  // }
};

export const useAnalytics = () => {
  return { trackEvent };
};
