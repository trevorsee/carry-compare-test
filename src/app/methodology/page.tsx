import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Search, FileText, RefreshCw, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Methodology',
  description: 'Learn how CarryCoverage researches, verifies, and ranks CCW legal protection plans.',
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How We Rank Plans</h1>
        <p className="text-xl text-gray-600">
          Our goal is to provide accurate, unbiased information to help you make an informed decision.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>What We Compare</h2>
        <p>
          We compare CCW legal protection plans (also called self-defense insurance or legal defense 
          membership programs) from major providers in the United States. Our comparison focuses on:
        </p>
        <ul>
          <li><strong>Pricing</strong> — Monthly and annual costs</li>
          <li><strong>Coverage type</strong> — Criminal defense, civil defense, or both</li>
          <li><strong>Payment model</strong> — Up-front payment vs. reimbursement</li>
          <li><strong>Attorney choice</strong> — Full choice, network only, or assigned</li>
          <li><strong>Family coverage</strong> — Whether spouse/dependents can be covered</li>
          <li><strong>Coverage limits</strong> — Caps on what the provider will pay</li>
          <li><strong>Waiting periods</strong> — Time before coverage takes effect</li>
          <li><strong>Included features</strong> — Hotlines, bail bonds, expert witnesses, etc.</li>
        </ul>

        <h2>What We Don&apos;t Compare</h2>
        <p>This site does not provide:</p>
        <ul>
          <li>Legal advice — We are not attorneys</li>
          <li>Personalized recommendations based on your specific situation</li>
          <li>State-by-state availability analysis (coming soon)</li>
          <li>User reviews or community ratings (we rely on objective data)</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6 my-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Data Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We gather information directly from provider websites, official plan documents, 
              and membership agreements. We do not rely on marketing claims alone.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Each plan&apos;s data is verified against primary sources. We record the verification 
              date and source links for transparency.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-purple-600" />
              Update Cadence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We review and update plan data monthly. Major changes (pricing, coverage terms) 
              are updated as soon as we become aware of them.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              Change Logging
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We maintain a change log for each plan so you can see what has been updated 
              and when. This ensures accountability.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>Scoring Methodology</h2>
        <p>
          Our overall scores (0-100) are calculated based on objective criteria:
        </p>
        <ul>
          <li><strong>Coverage comprehensiveness (30%)</strong> — Criminal + civil, limits, bail, appeals</li>
          <li><strong>Payment model (25%)</strong> — Up-front scores higher than reimbursement</li>
          <li><strong>Attorney choice (15%)</strong> — Full choice scores higher than network-only</li>
          <li><strong>Value (15%)</strong> — Coverage relative to price</li>
          <li><strong>Additional features (10%)</strong> — Hotlines, family options, training</li>
          <li><strong>Transparency (5%)</strong> — How clearly terms are disclosed</li>
        </ul>
        <p>
          Scores are calculated algorithmically to remove bias. Featured/sponsored plans do not 
          receive score boosts—they are labeled separately.
        </p>

        <h2>Sponsored Content & Affiliate Relationships</h2>
        <p>
          CarryCoverage may receive compensation when you click links to providers. This is how 
          we fund the site. However:
        </p>
        <ul>
          <li>Affiliate relationships do <strong>not</strong> affect our rankings or scores</li>
          <li>Sponsored placements are <strong>always labeled</strong> as &quot;Featured&quot; or &quot;Sponsored&quot;</li>
          <li>We compare plans from providers whether or not we have an affiliate relationship</li>
        </ul>
        <p>
          See our full <Link href="/disclosure" className="text-blue-600 hover:underline">affiliate disclosure</Link> for more details.
        </p>

        <h2>Handling Unknown Information</h2>
        <p>
          When we cannot verify specific plan details, we display &quot;Not disclosed&quot; rather than 
          guessing. We believe transparency about gaps in information is better than speculation.
        </p>

        <h2>Feedback & Corrections</h2>
        <p>
          If you notice incorrect or outdated information, please <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link>. 
          We take accuracy seriously and will investigate promptly.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-4">
          <Shield className="h-8 w-8 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Our Commitment</h3>
            <p className="text-gray-600">
              We built CarryCoverage because we saw too many confusing, biased comparison sites in 
              this space. Our commitment is to provide clear, accurate, and honest information—even 
              when that means highlighting the drawbacks of popular plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
