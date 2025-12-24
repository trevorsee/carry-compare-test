import Link from "next/link";
import { getGuideMeta } from "@/lib/guides";

export const metadata = {
  title: "Guides",
};

export default async function GuidesIndexPage() {
  const guides = await getGuideMeta();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Guides</h1>
        <p className="text-slate-700">
          Plain-English explanations to help you compare plans without relying on
          marketing claims.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug} className="rounded-lg border border-slate-200 p-4">
            <Link href={`/guides/${g.slug}`} className="font-medium hover:underline">
              {g.title}
            </Link>
            {g.description ? (
              <p className="mt-1 text-sm text-slate-600">{g.description}</p>
            ) : null}
            <p className="mt-2 text-xs text-slate-500">
              {g.author ? `${g.author} · ` : null}
              {g.updatedAt ? `Updated ${g.updatedAt}` : null}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

