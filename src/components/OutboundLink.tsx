"use client";

import { trackOutboundClick } from "@/lib/track";

export function OutboundLink({
  href,
  providerId,
  planId,
  placement,
  pagePath,
  positionIndex,
  ctaLabel,
  className,
  children,
}: {
  href: string;
  providerId: string;
  planId: string;
  placement: "table" | "provider" | "compare";
  pagePath: string;
  positionIndex?: number;
  ctaLabel?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        trackOutboundClick({
          provider_id: providerId,
          plan_id: planId,
          placement,
          page_path: pagePath,
          position_index: positionIndex,
          cta_label: ctaLabel,
        });
      }}
    >
      {children}
    </a>
  );
}

