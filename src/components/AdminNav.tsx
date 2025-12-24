"use client";

import Link from "next/link";

export function AdminNav() {
  async function logout() {
    await fetch("/admin/session", { method: "DELETE" });
    location.href = "/admin";
  }

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/admin/providers" className="underline">
          Providers
        </Link>
        <Link href="/admin/plans" className="underline">
          Plans
        </Link>
        <Link href="/admin/sources" className="underline">
          Sources
        </Link>
      </div>
      <button
        type="button"
        className="rounded border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
        onClick={logout}
      >
        Sign out
      </button>
    </div>
  );
}

