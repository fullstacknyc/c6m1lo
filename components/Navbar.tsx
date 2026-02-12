"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <Link href="/" className="text-white font-bold text-xl">
              Camilo777
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-400 hover:text-gray-200 text-sm">
              Home
            </Link>
            <Link href="/projects" className="text-gray-400 hover:text-gray-200 text-sm">
              Projects
            </Link>
            <Link href="/resume" className="text-gray-400 hover:text-gray-200 text-sm">
              Resume
            </Link>
            <Link href="/scheduler" className="text-gray-400 hover:text-gray-200 text-sm">
              Scheduler
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
