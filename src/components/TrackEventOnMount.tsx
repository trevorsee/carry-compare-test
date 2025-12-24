"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

export function TrackEventOnMount({
  name,
  payload,
}: {
  name: string;
  payload?: Record<string, unknown>;
}) {
  useEffect(() => {
    trackEvent(name, payload ?? {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

