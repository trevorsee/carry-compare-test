import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-slate-700">
        The page you’re looking for doesn’t exist or requires additional parameters.
      </p>
      <Link href="/compare" className="underline">
        Go to comparison table
      </Link>
    </div>
  );
}

