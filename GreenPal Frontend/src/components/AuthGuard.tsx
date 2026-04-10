"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      // Check for access token in localStorage
      const accessToken = localStorage.getItem("access_token");
      const hasAuth = !!accessToken;


      const isAuthPage = pathname?.startsWith("/auth");

      if (!hasAuth && !isAuthPage) {
        // Not authenticated, redirect to login
        setIsAuthorized(false);
        router.replace("/auth");
      } else if (hasAuth && isAuthPage) {
        // Authenticated but on auth page, redirect to home
        setIsAuthorized(true);
        router.replace("/");
      } else {
        setIsAuthorized(true);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isAuthorized === null) return null;


  return <>{children}</>;
}