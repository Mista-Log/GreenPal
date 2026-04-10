"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmailAuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Invalid email or password");
      }

      // ✅ Store tokens locally
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      

      // Redirect home
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="relative mx-auto min-h-screen w-full max-w-(--app-shell-max) px-4 pb-10 pt-8 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            href="/auth"
            className="text-sm font-medium leading-5 tracking-[0.1px] text-primary"
          >
            Back
          </Link>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl font-normal leading-8 tracking-[0] text-on-surface">
            Sign in or create account
          </h1>
          <p className="mt-2 text-xs leading-4 tracking-[0.4px] text-on-surface-variant">
            Use your email to continue to Greenpal.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}> 
          {error && ( <p className="text-sm text-error bg-error-container p-3 rounded-lg"> {error} </p> )}

          <label className="block">
            <span className="text-xs font-medium leading-4 tracking-[0.4px] text-on-surface-variant">
              Email address
            </span>
            <input
              type="email"
              name="email"
              placeholder="name@email.com"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-xl border border-solid border-outline bg-surface-container px-4 py-3.5 text-sm leading-5 tracking-[0.25px] text-on-surface outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/60"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium leading-4 tracking-[0.4px] text-on-surface-variant">
              Password
            </span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-solid border-outline bg-surface-container px-4 py-3.5 text-sm leading-5 tracking-[0.25px] text-on-surface outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/60"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-medium leading-5 tracking-[0.1px] text-white"


          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <Link
            href="/auth/create"
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-outline text-sm font-medium leading-5 tracking-[0.1px] text-on-surface transition-colors hover:border-primary/60"
          >
            Create account
          </Link>
          <p className="text-center text-xs leading-4 tracking-[0.4px] text-on-surface-variant">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
