"use client";

import { useState } from "react";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function login() {
    setStatus("loading");
    const res = await fetch("/admin/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (res.ok) {
      setStatus("ok");
      location.href = "/admin/providers";
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="text-sm text-slate-600">Enter the admin token to manage plans.</p>
      <div className="space-y-2">
        <input
          type="password"
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="ADMIN_TOKEN"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button
          type="button"
          className="w-full rounded bg-slate-900 px-3 py-2 text-white hover:bg-slate-800 disabled:opacity-50"
          disabled={!token || status === "loading"}
          onClick={login}
        >
          {status === "loading" ? "Signing in…" : "Sign in"}
        </button>
        {status === "error" ? (
          <p className="text-sm text-red-600">Invalid token.</p>
        ) : null}
      </div>
    </div>
  );
}

