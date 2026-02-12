import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "Camilo777",
  description: "Camilo Gomez's personal website and portfolio.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: "Camilo Gomez, Camilo777, personal website, portfolio, resume, projects",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-black border-t border-gray-800 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Camilo777. All rights reserved.
            </p>
            <a href="/privacy" className="text-gray-400 hover:text-gray-200 text-sm block text-center mt-2">
              Privacy Policy
            </a>
            <a href="/support" className="text-gray-400 hover:text-gray-200 text-sm block text-center mt-1">
              Support
            </a>
            <a href="/tos" className="text-gray-400 hover:text-gray-200 text-sm block text-center mt-1">
              Terms of Service
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}