"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { Borel } from "next/font/google";

// const borel = Borel({
//   weight: "400",
//   subsets: ["latin"],
//   display: "swap",
// });


export default function AuthPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    // Just redirect the user to your FastAPI Google login endpoint
    window.location.href = "http://localhost:8000/api/v1/auth/google/login";
  };

  return (
    <div className="min-h-dvh bg-background text-on-surface flex flex-col items-center">
      <div className="relative w-full max-w-(--app-shell-max) flex flex-col h-full min-h-dvh pb-10">
        <div className="flex-1 flex flex-col pt-10">
          <div className="relative flex-1 min-h-75 w-full overflow-hidden mb-6">
            <Image
              src="/figma/auth-hero.png"
              alt="Greenpal farmer illustration"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-col items-center px-6">
            <div className="flex items-center justify-center gap-2.5">
              <div
                className="text-4xl font-bold flex items-center gap-1 font-sans"
              >
                <span className="text-primary tracking-tighter">Greenpal</span>
              </div>
            </div>
            <p className="mt-2 text-center text-sm font-medium leading-5 tracking-[0.1px] text-on-surface-variant max-w-70">
              AI Farming Assistant for Every African Farmer
            </p>

            <div className="mt-11 w-full px-6 flex justify-center">
              <Link
                href="/auth/email"
                className="flex h-14 w-full max-w-md items-center justify-center gap-3 rounded-full bg-primary text-on-primary font-medium active:scale-95 transition-transform shadow-sm"
              >
                <span className="material-symbols-rounded">mail</span>
                Sign in with Email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
