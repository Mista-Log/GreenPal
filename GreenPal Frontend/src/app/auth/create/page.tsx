"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateAccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          full_name: data.full_name,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.detail || "Signup failed");

      // Redirect to a check-email page or login
      alert("Account created! Please check your email to confirm.");
      router.push("/auth/email");
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
          <Link href="/auth/email" className="text-sm font-medium text-primary">Back</Link>
          <Link href="/auth/email" className="text-sm font-medium text-on-surface-variant">Sign in</Link>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl font-normal text-on-surface">Create your account</h1>
          <p className="mt-2 text-xs text-on-surface-variant">Set up your Green Sabi profile below.</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          

          <label className="block">
            <span className="text-xs font-medium text-on-surface-variant">Full name</span>
            <input
              name="full_name"
              type="text"
              required
              placeholder="Your full name"
              className="mt-2 w-full rounded-xl border border-outline bg-surface-container px-4 py-3.5 text-sm outline-none focus:border-primary"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-on-surface-variant">Email address</span>
            <input
              name="email"
              type="email"
              required
              placeholder="name@email.com"
              className="mt-2 w-full rounded-xl border border-outline bg-surface-container px-4 py-3.5 text-sm outline-none focus:border-primary"

            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-on-surface-variant">Password</span>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="mt-2 w-full rounded-xl border border-outline bg-surface-container px-4 py-3.5 text-sm outline-none focus:border-primary"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
