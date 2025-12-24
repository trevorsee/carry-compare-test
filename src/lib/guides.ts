import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export type GuideFrontmatter = {
  title: string;
  description?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
};

const guidesDir = path.join(process.cwd(), "content", "guides");

export async function getGuideSlugs(): Promise<string[]> {
  const entries = await fs.readdir(guidesDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name.replace(/\.mdx$/, ""))
    .sort();
}

export async function getGuideMeta() {
  const slugs = await getGuideSlugs();
  const metas = await Promise.all(
    slugs.map(async (slug) => {
      const file = await fs.readFile(path.join(guidesDir, `${slug}.mdx`), "utf8");
      const { data } = matter(file);
      return { slug, ...(data as GuideFrontmatter) };
    }),
  );
  return metas;
}

export async function renderGuide(slug: string) {
  const file = await fs.readFile(path.join(guidesDir, `${slug}.mdx`), "utf8");
  const { content, data } = matter(file);
  const frontmatter = data as GuideFrontmatter;

  const mdx = await MDXRemote({
    source: content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  return { frontmatter, mdx };
}

