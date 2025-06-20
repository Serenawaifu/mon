import React from "react";
import { AiOutlineMenu } from "react-icons/ai"; // Using React Icons
import Link from "next/link"; // Use Next.js Link for navigation

export default function Header({ onOpenThemeSwitcher }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-gray-900 select-none">
          Wulu
        </Link>

        {/* Navigation links (hidden on mobile) */}
        <nav className="hidden md:flex space-x-8 font-semibold text-gray-700 tracking-wide">
          <Link href="/anime" className="hover:text-black transition-colors duration-200">
            Anime
          </Link>
          <Link href="/manga" className="hover:text-black transition-colors duration-200">
            Manga
          </Link>
          <Link href="/forum" className="hover:text-black transition-colors duration-200">
            Forum
          </Link>
          <Link href="/marketplace" className="hover:text-black transition-colors duration-200">
            Marketplace
          </Link>
        </nav>

        {/* Right-side buttons */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher toggle (for mobile, shows hamburger) */}
          <button
            onClick={onOpenThemeSwitcher}
            aria-label="Open Theme Switcher"
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            title="Select Theme"
          >
            <AiOutlineMenu className="w-6 h-6 text-gray-700" />
          </button>

          {/* CTA Button (visible desktop only) */}
          <Link
            href="/auth"
            className="hidden md:inline-block px-6 py-3 rounded-lg bg-black text-white font-semibold text-lg shadow-md hover:bg-gray-900 transition-colors select-none"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
