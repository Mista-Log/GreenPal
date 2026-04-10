import type { Metadata, Viewport } from "next";
import { Roboto, Urbanist, Borel } from "next/font/google";
import "./globals.css";

import AuthGuard from "@/components/AuthGuard";
import I18nProvider from "@/components/I18nProvider";
import SideNavRail, { SideNavProvider } from "@/components/SideNavRail";
import MainContent from "@/components/MainContent";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const borel = Borel({
  variable: "--font-borel",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://greenpal-three.vercel.app"),
  title: "Greenpal",
  description: "Greenpal AI-powered agricultural assistant",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Greenpal",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7fbf1" },
    { media: "(prefers-color-scheme: dark)", color: "#11140e" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${roboto.variable} ${borel.variable} light h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="theme-color"
          content="#f7fbf1"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#11140e"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0..1,0"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Greenpal" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }).catch(function(err) {
                    console.error('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.classList.remove('light', 'dark');
                  if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="min-h-full bg-background transition-colors duration-300"
        suppressHydrationWarning
      >
        <I18nProvider>
          <SideNavProvider>
            <div className="relative flex min-h-screen">
              <SideNavRail />
              <MainContent>
                <AuthGuard>{children}</AuthGuard>
              </MainContent>
            </div>
          </SideNavProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
