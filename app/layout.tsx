import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import AdSense from "@/components/AdSense";

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.camilo777.com"),
  title: {
    default: "Camilo Gomez | Portfolio",
    template: "%s | Camilo Gomez",
  },
  description: "Personal site and portfolio for Camilo Gomez.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "Camilo Gomez",
    "Camilo777",
    "portfolio",
    "projects",
    "resume",
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AdSense pId="ca-pub-9659879669905345"></AdSense>
      </head>
      <body className={`${bodyFont.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="mt-14 border-t border-neutral-800 bg-black/90">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-sm text-neutral-400 sm:px-8">
            <p>© {new Date().getFullYear()} Camilo Gomez. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <a className="transition hover:text-neutral-100" href="/privacy">
                Privacy Policy
              </a>
              <a className="transition hover:text-neutral-100" href="/support">
                Support
              </a>
              <a className="transition hover:text-neutral-100" href="/tos">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
