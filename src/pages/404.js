import React from "react";
import Link from "next/link"; // Use Next.js Link component

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 sm:px-16">
      <h1 className="text-7xl font-extrabold text-gray-900 mb-6 select-none" aria-label="404">
        404
      </h1>
      <p className="text-gray-600 text-xl max-w-lg mb-8 text-center" role="alert">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <a className="inline-block px-8 py-4 bg-black text-white font-bold rounded-lg shadow-md hover:bg-gray-900 transition">
          Go Home
        </a>
      </Link>
    </main>
  );
}
