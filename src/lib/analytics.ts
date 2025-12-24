// Analytics utility for tracking user behavior
// This is a lightweight implementation that can be connected to any analytics service

import { AnalyticsEvent, AnalyticsEventType } from "@/types";

type AnalyticsCallback = (event: AnalyticsEvent) => void;

let analyticsCallbacks: AnalyticsCallback[] = [];

// Register a callback to receive analytics events
export function registerAnalyticsCallback(callback: AnalyticsCallback): () => void {
  analyticsCallbacks.push(callback);
  return () => {
    analyticsCallbacks = analyticsCallbacks.filter((cb) => cb !== callback);
  };
}

// Track an event
export function trackEvent(
  type: AnalyticsEventType,
  data: Record<string, unknown> = {}
): void {
  const event: AnalyticsEvent = {
    type,
    timestamp: new Date(),
    data,
  };

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", type, data);
  }

  // Notify all registered callbacks
  analyticsCallbacks.forEach((cb) => cb(event));

  // Here you would integrate with your actual analytics service:
  // - Google Analytics
  // - Mixpanel
  // - Amplitude
  // - Custom backend
}

// Convenience functions for common events
export const analytics = {
  filterApplied: (filterName: string, value: unknown) => {
    trackEvent("filter_applied", { filterName, value });
  },

  filterCleared: () => {
    trackEvent("filter_cleared", {});
  },

  planViewed: (planId: string, planName: string) => {
    trackEvent("plan_viewed", { planId, planName });
  },

  comparisonStarted: (planIds: string[]) => {
    trackEvent("comparison_started", { planIds, count: planIds.length });
  },

  comparisonViewed: (planIds: string[]) => {
    trackEvent("comparison_viewed", { planIds, count: planIds.length });
  },

  outboundClick: (planId: string, planName: string, destination: string) => {
    trackEvent("outbound_click", { planId, planName, destination });
  },

  educationContentViewed: (topicId: string, topicTitle: string) => {
    trackEvent("education_content_viewed", { topicId, topicTitle });
  },

  exclusionExpanded: (planId: string, exclusionCategory: string) => {
    trackEvent("exclusion_expanded", { planId, exclusionCategory });
  },

  sourceClicked: (planId: string, sourceUrl: string) => {
    trackEvent("source_clicked", { planId, sourceUrl });
  },
};
