type TrackPayload = Record<string, unknown>;

function sendJson(url: string, body: TrackPayload) {
  const json = JSON.stringify(body);
  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const ok = navigator.sendBeacon(
      url,
      new Blob([json], { type: "application/json" }),
    );
    if (ok) return;
  }
  void fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
    keepalive: true,
  });
}

export function trackEvent(name: string, payload: TrackPayload = {}) {
  sendJson("/api/events/track", {
    name,
    payload,
    pagePath: typeof location !== "undefined" ? location.pathname : undefined,
  });
}

export function trackOutboundClick(payload: {
  provider_id: string;
  plan_id: string;
  placement: "table" | "provider" | "compare";
  page_path: string;
  position_index?: number;
  cta_label?: string;
}) {
  sendJson("/api/events/outbound-click", payload);
}

