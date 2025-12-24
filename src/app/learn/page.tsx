"use client";

import Link from "next/link";
import { educationTopics } from "@/data/education";
import { EducationCard } from "@/components/EducationCard";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Understanding Concealed Carry Legal Protection
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Before you compare plans, understand the key concepts. These
              explanations will help you evaluate options based on what actually
              matters.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {educationTopics.map((topic) => (
              <a
                key={topic.id}
                href={`#${topic.id}`}
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-200 transition-colors">
                  <svg
                    className="w-4 h-4 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-900">{topic.title}</span>
                  <span className="block text-sm text-gray-500">
                    {topic.shortDescription}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Education Topics */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-4">
          {educationTopics.map((topic, index) => (
            <div key={topic.id} id={topic.id}>
              <EducationCard topic={topic} expanded={index === 0} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Ready to Compare Plans?</h2>
          <p className="mt-2 text-primary-100 max-w-lg mx-auto">
            Now that you understand the key concepts, use our comparison tool to
            find the right plan for your needs.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
          >
            Compare Plans
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
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-amber-800">
                This Is Not Legal Advice
              </h3>
              <p className="mt-2 text-amber-700">
                The information on this page is for educational purposes only and
                should not be construed as legal advice. Self-defense laws vary
                significantly by state and situation. Always consult with a
                licensed attorney in your jurisdiction for legal guidance specific
                to your circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
