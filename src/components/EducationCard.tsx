"use client";

import { useState } from "react";
import { EducationTopic } from "@/data/education";
import { analytics } from "@/lib/analytics";

interface EducationCardProps {
  topic: EducationTopic;
  expanded?: boolean;
}

export function EducationCard({ topic, expanded = false }: EducationCardProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleToggle = () => {
    if (!isExpanded) {
      analytics.educationContentViewed(topic.id, topic.title);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full px-6 py-4 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
      >
        <div>
          <h3 className="font-semibold text-gray-900">{topic.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{topic.shortDescription}</p>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 mt-1 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div
            className="mt-4 prose prose-sm max-w-none text-gray-600"
            dangerouslySetInnerHTML={{
              __html: topic.fullContent
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/### (.*?)$/gm, "<h4 class='font-semibold text-gray-900 mt-4 mb-2'>$1</h4>")
                .replace(/\n\n/g, "</p><p class='mt-3'>")
                .replace(/^- (.*?)$/gm, "<li>$1</li>")
                .replace(/^\d\. (.*?)$/gm, "<li>$1</li>"),
            }}
          />
          <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium text-primary-900">Key Takeaway</p>
                <p className="mt-1 text-sm text-primary-700">
                  {topic.keyTakeaway}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface QuickLearnBannerProps {
  onLearnMore: () => void;
}

export function QuickLearnBanner({ onLearnMore }: QuickLearnBannerProps) {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-semibold">New to concealed carry coverage?</h3>
          <p className="mt-1 text-primary-100">
            Understand the key differences in 2 minutes
          </p>
        </div>
        <button
          onClick={onLearnMore}
          className="px-4 py-2 bg-white text-primary-700 font-medium rounded-lg hover:bg-primary-50 transition-colors flex items-center"
        >
          Learn the Basics
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
