import { Metadata } from 'next';
import { Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the CarryCoverage team.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Have questions, corrections, or feedback? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              For general inquiries, corrections, or partnership opportunities:
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:hello@carrycoverage.com">
                hello@carrycoverage.com
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report an Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Found incorrect or outdated information about a plan? Let us know and 
              we&apos;ll investigate promptly.
            </p>
            <p className="text-sm text-gray-500">
              Please include the plan name, what information is incorrect, and 
              a source if available.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Response Time</h2>
        <p className="text-gray-600">
          We typically respond to inquiries within 1-2 business days. For urgent 
          corrections to plan information, we prioritize these requests.
        </p>
      </div>
    </div>
  );
}
