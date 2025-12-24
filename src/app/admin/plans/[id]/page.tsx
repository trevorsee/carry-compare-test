import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Calendar, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';
import { parseJSON } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Edit Plan - Admin',
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ id: string }>;
}

async function getPlan(id: string) {
  const plan = await prisma.plan.findUnique({
    where: { id },
    include: {
      provider: true,
      sources: true,
      changeLogs: {
        orderBy: { changedAt: 'desc' },
        take: 10,
      },
    },
  });
  return plan;
}

export default async function AdminPlanEditPage({ params }: Props) {
  const { id } = await params;
  const plan = await getPlan(id);

  if (!plan) {
    notFound();
  }

  const pros = parseJSON<string[]>(plan.prosJson, []);
  const cons = parseJSON<string[]>(plan.consJson, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/plans" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{plan.name}</h1>
          <p className="text-gray-600">{plan.provider.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/plans/${plan.slug}`} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live
            </Link>
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    defaultValue={plan.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    defaultValue={plan.slug}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={plan.isActive} className="rounded" />
                  <span className="text-sm">Active</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={plan.isFeatured} className="rounded" />
                  <span className="text-sm">Featured</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Price</label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={plan.priceMonthly || ''}
                    placeholder="Leave blank if not available"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Price</label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={plan.priceAnnual || ''}
                    placeholder="Leave blank if not available"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coverage Details */}
          <Card>
            <CardHeader>
              <CardTitle>Coverage Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Style</label>
                  <select
                    defaultValue={plan.paymentStyle}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="upfront">Up-front</option>
                    <option value="reimbursement">Reimbursement</option>
                    <option value="mixed">Mixed</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attorney Choice</label>
                  <select
                    defaultValue={plan.attorneyChoice}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="yes">Full choice</option>
                    <option value="limited">Network only</option>
                    <option value="no">Assigned</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Type</label>
                  <select
                    defaultValue={plan.coverageType}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="both">Criminal & Civil</option>
                    <option value="criminal">Criminal only</option>
                    <option value="civil">Civil only</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Family Coverage</label>
                  <select
                    defaultValue={plan.familyCoverage}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="yes">Included</option>
                    <option value="limited">Available (add-on)</option>
                    <option value="no">Not available</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Waiting Period (days)</label>
                  <input
                    type="number"
                    defaultValue={plan.waitingPeriodDays || ''}
                    placeholder="0 for none"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Overall Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={plan.overallScore || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Notes</label>
                <textarea
                  rows={3}
                  defaultValue={plan.coverageNotes || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exclusions Notes</label>
                <textarea
                  rows={3}
                  defaultValue={plan.exclusionsNotes || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Marketing */}
          <Card>
            <CardHeader>
              <CardTitle>Marketing Copy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Best For</label>
                <input
                  type="text"
                  defaultValue={plan.bestFor || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Not Ideal If</label>
                <input
                  type="text"
                  defaultValue={plan.notIdealIf || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pros (JSON array)</label>
                  <textarea
                    rows={4}
                    defaultValue={JSON.stringify(pros, null, 2)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cons (JSON array)</label>
                  <textarea
                    rows={4}
                    defaultValue={JSON.stringify(cons, null, 2)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card>
            <CardHeader>
              <CardTitle>Call to Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Affiliate URL</label>
                <input
                  type="url"
                  defaultValue={plan.affiliateUrl || ''}
                  placeholder="Leave blank to use provider website"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Label</label>
                <input
                  type="text"
                  defaultValue={plan.ctaLabel}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                {plan.isActive ? (
                  <Badge variant="success">Active</Badge>
                ) : (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Featured</span>
                <Badge variant={plan.isFeatured ? 'default' : 'secondary'}>
                  {plan.isFeatured ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Score</span>
                <span className="font-bold">{plan.overallScore || 'N/A'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Verified</label>
                <input
                  type="date"
                  defaultValue={format(new Date(plan.lastVerifiedAt), 'yyyy-MM-dd')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Mark as Verified Today
              </Button>
            </CardContent>
          </Card>

          {/* Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Sources ({plan.sources.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {plan.sources.map((source) => (
                <div key={source.id} className="text-sm border-b border-gray-100 pb-2 last:border-0">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate block"
                  >
                    {source.title || source.url}
                  </a>
                  {source.note && (
                    <span className="text-gray-500">{source.note}</span>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                Add Source
              </Button>
            </CardContent>
          </Card>

          {/* Change Log */}
          {plan.changeLogs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Changes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {plan.changeLogs.map((log) => (
                  <div key={log.id} className="text-sm border-b border-gray-100 pb-2 last:border-0">
                    <div className="font-medium">{log.summary}</div>
                    <div className="text-gray-500">
                      {log.changedBy} • {format(new Date(log.changedAt), 'MMM d, yyyy')}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
