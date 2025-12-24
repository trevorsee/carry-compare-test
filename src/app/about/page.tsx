import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Target, Users, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about CarryCoverage and our mission to help concealed carriers find the right legal protection.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About CarryCoverage</h1>
        <p className="text-xl text-gray-600">
          Helping concealed carriers find the right legal protection
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>Our Mission</h2>
        <p>
          CarryCoverage exists to cut through the confusion and marketing noise in the 
          CCW legal protection industry. We believe every responsible gun owner deserves 
          clear, accurate information to make informed decisions about their legal protection.
        </p>

        <h2>Why We Built This</h2>
        <p>
          When researching CCW insurance options, we found a landscape filled with:
        </p>
        <ul>
          <li>Confusing marketing terminology designed to obscure rather than clarify</li>
          <li>Comparison sites that ranked providers based on affiliate commissions</li>
          <li>Incomplete information that left out critical details like exclusions</li>
          <li>Outdated data that hadn&apos;t been verified in years</li>
        </ul>
        <p>
          We built CarryCoverage to be the resource we wished existed—honest, comprehensive, 
          and regularly updated.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 my-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mb-4">
            <Target className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Accuracy</h3>
          <p className="text-gray-600 text-sm">
            We verify every data point against primary sources and update regularly.
          </p>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 mb-4">
            <Users className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Independence</h3>
          <p className="text-gray-600 text-sm">
            Our rankings are based on objective criteria, not who pays us the most.
          </p>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 text-purple-600 mb-4">
            <BookOpen className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Education</h3>
          <p className="text-gray-600 text-sm">
            We help you understand what you&apos;re buying, not just which plan to choose.
          </p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>Our Approach</h2>
        <p>
          We take a data-driven approach to comparing CCW legal protection plans:
        </p>
        <ol>
          <li>
            <strong>Research</strong> — We gather information from official provider sources, 
            not just marketing materials.
          </li>
          <li>
            <strong>Verify</strong> — Every data point is verified and dated so you know 
            when it was last confirmed.
          </li>
          <li>
            <strong>Analyze</strong> — We score plans based on objective criteria that 
            matter to concealed carriers.
          </li>
          <li>
            <strong>Explain</strong> — We don&apos;t just rank plans—we help you understand 
            the differences that matter for your situation.
          </li>
        </ol>
        <p>
          Read more about our process in our <Link href="/methodology" className="text-blue-600 hover:underline">methodology</Link>.
        </p>

        <h2>Disclaimer</h2>
        <p>
          CarryCoverage provides general information only. We are not attorneys and do not 
          provide legal advice. The information on this site should not be used as a 
          substitute for professional legal counsel.
        </p>
        <p>
          Always read the full terms, conditions, and exclusions from providers before 
          purchasing any plan. Coverage details can change, and state laws vary.
        </p>

        <h2>Contact Us</h2>
        <p>
          Have questions, corrections, or feedback? We&apos;d love to hear from you. 
          Reach out at <Link href="/contact" className="text-blue-600 hover:underline">our contact page</Link>.
        </p>
      </div>
    </div>
  );
}
