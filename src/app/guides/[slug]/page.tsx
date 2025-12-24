import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideSlugs, renderGuide } from "@/lib/guides";

export async function generateStaticParams() {
  const slugs = await getGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let rendered: Awaited<ReturnType<typeof renderGuide>>;
  try {
    rendered = await renderGuide(slug);
  } catch {
    notFound();
  }

  const { frontmatter, mdx } = rendered;

  return (
    <article className="prose prose-slate max-w-none">
      <div className="not-prose mb-6 space-y-2">
        <Link href="/guides" className="text-sm text-slate-600 hover:underline">
          ← All guides
        </Link>
        <h1 className="text-3xl font-semibold">{frontmatter.title}</h1>
        <p className="text-sm text-slate-600">
          {frontmatter.author ? `${frontmatter.author} · ` : null}
          {frontmatter.updatedAt ? `Updated ${frontmatter.updatedAt}` : null}
        </p>
        {frontmatter.description ? (
          <p className="text-slate-700">{frontmatter.description}</p>
        ) : null}
      </div>
      {mdx}
    </article>
  );
}

