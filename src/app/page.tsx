import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Scale, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import prisma from '@/lib/db';

async function getStats() {
  const [providerCount, planCount] = await Promise.all([
    prisma.provider.count({ where: { isActive: true } }),
    prisma.plan.count({ where: { isActive: true } }),
  ]);
  return { providerCount, planCount };
}

export default async function HomePage() {
  const { providerCount, planCount } = await getStats();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Find the Right CCW Legal Protection
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Compare {planCount} concealed carry legal protection plans from {providerCount} providers. 
              Unbiased reviews, transparent pricing, and clear explanations of what you&apos;re actually buying.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/compare">
                  Compare Plans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
                <Link href="/guides/how-concealed-carry-legal-protection-works">
                  Learn How It Works
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{planCount}</div>
              <div className="text-sm text-gray-600">Plans Compared</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{providerCount}</div>
              <div className="text-sm text-gray-600">Providers Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">Monthly</div>
              <div className="text-sm text-gray-600">Data Updates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">Independent Research</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Use CarryCoverage?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We cut through the marketing speak to show you what each plan actually covers, 
              what it costs, and what the catches are.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Scale className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Unbiased Comparison</h3>
              <p className="text-gray-600">
                Our rankings are based on objective criteria, not who pays us the most.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 mb-4">
                <CheckCircle className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Data</h3>
              <p className="text-gray-600">
                Every plan is verified with sources and updated regularly.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Comparisons</h3>
              <p className="text-gray-600">
                Compare up to 4 plans side-by-side with all the details.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Time</h3>
              <p className="text-gray-600">
                Find your shortlist in under 60 seconds with smart filters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Questions */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You Need to Know
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding CCW legal protection can be confusing. Here are the key factors that matter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Up-Front vs. Reimbursement</h3>
              <p className="text-gray-600 mb-4">
                The biggest difference: do they pay your legal fees directly, or do you pay first and get reimbursed later?
              </p>
              <Link href="/guides/upfront-vs-reimbursement-coverage" className="text-blue-600 hover:underline text-sm font-medium">
                Learn more →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Attorney Choice</h3>
              <p className="text-gray-600 mb-4">
                Can you choose your own lawyer, or must you use their network? This matters more than you might think.
              </p>
              <Link href="/guides/attorney-choice-explained" className="text-blue-600 hover:underline text-sm font-medium">
                Learn more →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Coverage Limits</h3>
              <p className="text-gray-600 mb-4">
                Some plans have caps on what they&apos;ll pay. Others offer unlimited coverage. Know the difference.
              </p>
              <Link href="/compare" className="text-blue-600 hover:underline text-sm font-medium">
                Compare limits →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exclusions & Gotchas</h3>
              <p className="text-gray-600 mb-4">
                Every plan has exclusions. Know what&apos;s not covered before you need it.
              </p>
              <Link href="/guides/common-exclusions-gotchas" className="text-blue-600 hover:underline text-sm font-medium">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl font-bold mb-4">Ready to Compare Plans?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Use our comparison tool to find the right CCW legal protection for your needs and budget.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/compare">
              Start Comparing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
