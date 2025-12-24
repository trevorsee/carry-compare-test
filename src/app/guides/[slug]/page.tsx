import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getGuide(slug: string) {
  const guide = await prisma.guide.findUnique({
    where: { slug },
  });
  return guide;
}

async function getRelatedGuides(currentSlug: string) {
  const guides = await prisma.guide.findMany({
    where: {
      isPublished: true,
      slug: { not: currentSlug },
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  });
  return guides;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return { title: 'Guide Not Found' };

  return {
    title: guide.title,
    description: guide.description || `Read our guide: ${guide.title}`,
  };
}

export async function generateStaticParams() {
  const guides = await prisma.guide.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });
  return guides.map((guide) => ({ slug: guide.slug }));
}

// Simple markdown-like renderer (basic implementation)
function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let inList = false;
  let listType: 'ul' | 'ol' = 'ul';

  const flushList = () => {
    if (currentList.length > 0) {
      const ListTag = listType;
      elements.push(
        <ListTag key={elements.length} className={listType === 'ol' ? 'list-decimal' : 'list-disc'}>
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      );
      currentList = [];
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    // Headers
    if (line.startsWith('# ')) {
      flushList();
      elements.push(<h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.slice(4)}</h3>);
    }
    // Unordered list
    else if (line.match(/^[-*] /)) {
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
      }
      currentList.push(line.slice(2));
    }
    // Ordered list
    else if (line.match(/^\d+\. /)) {
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
      }
      currentList.push(line.replace(/^\d+\. /, ''));
    }
    // Bold text in paragraphs
    else if (line.trim() !== '') {
      flushList();
      // Simple bold replacement
      const processed = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      elements.push(
        <p 
          key={index} 
          className="my-4" 
          dangerouslySetInnerHTML={{ __html: processed }}
        />
      );
    }
    // Empty line
    else if (inList) {
      flushList();
    }
  });

  flushList();
  return elements;
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide || !guide.isPublished) {
    notFound();
  }

  const relatedGuides = await getRelatedGuides(slug);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Link
        href="/guides"
        className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        All Guides
      </Link>

      {/* Article Header */}
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{guide.title}</h1>
          {guide.description && (
            <p className="text-xl text-gray-600 mb-6">{guide.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {guide.author && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {guide.author}
              </div>
            )}
            {guide.publishedAt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Published {format(new Date(guide.publishedAt), 'MMMM d, yyyy')}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Updated {format(new Date(guide.updatedAt), 'MMMM d, yyyy')}
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {renderContent(guide.content)}
        </div>
      </article>

      {/* CTA */}
      <div className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-4">
          <BookOpen className="h-8 w-8 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Ready to Compare Plans?</h3>
            <p className="text-gray-600 mb-4">
              Use our comparison tool to see how different CCW legal protection plans stack up.
            </p>
            <Button asChild>
              <Link href="/compare">Compare Plans</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedGuides.map((relatedGuide) => (
              <Link
                key={relatedGuide.id}
                href={`/guides/${relatedGuide.slug}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900 mb-2">{relatedGuide.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {relatedGuide.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
