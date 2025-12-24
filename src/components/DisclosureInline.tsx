import Link from "next/link";

export function DisclosureInline() {
  return (
    <p className="text-xs text-slate-600">
      Affiliate disclosure: we may earn compensation from some links.{" "}
      <Link href="/disclosures" className="underline">
        Learn more
      </Link>
      .
    </p>
  );
}

