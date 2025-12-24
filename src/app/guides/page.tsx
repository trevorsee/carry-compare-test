import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'CCW Legal Protection Guides',
  description: 'Educational guides to help you understand concealed carry legal protection, coverage types, and how to choose the right plan.',
};

async function getGuides() {
  const guides = await prisma.guide.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
  });
  return guides;
}

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">CCW Legal Protection Guides</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Educational resources to help you understand concealed carry legal protection 
          and make an informed decision.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Link key={guide.id} href={`/guides/${guide.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{guide.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {guide.publishedAt && format(new Date(guide.publishedAt), 'MMM d, yyyy')}
                  </div>
                  <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {guides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No guides available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
