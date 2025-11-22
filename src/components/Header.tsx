"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isYogoPage = pathname === "/yogo";
  const isClassesPage = pathname === "/classes";
  const isWhiteBackgroundPage = isYogoPage || isClassesPage;

  return (
    <header
      className={`${
        isWhiteBackgroundPage ? "relative bg-white" : "absolute right-0"
      } top-0 left-0 w-full z-50 py-6 px-8 flex items-center justify-between max-w-7xl mx-auto`}
    >
      <div className="flex items-center gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo size={40} className="drop-shadow-sm" variant={isHomePage ? "white" : "green"} />
        </Link>
        <div className="flex flex-col">
          <span
            className={`font-serif text-xl font-bold leading-none ${
              isWhiteBackgroundPage ? "text-primary" : "text-white"
            }`}
          >
            Sadhana Yogshala
          </span>
          <span
            className={`text-xs uppercase tracking-wider ${
              isWhiteBackgroundPage ? "text-secondary" : "text-white/80"
            }`}
          >
            Yoga Studio
          </span>
        </div>
      </div>

      <nav
        className={`hidden lg:flex items-center gap-8 font-medium text-sm tracking-wide ${
          isWhiteBackgroundPage ? "text-primary" : "text-white"
        }`}
      >
        <Link
          href="/"
          className={`transition-colors ${
            isWhiteBackgroundPage
              ? "hover:text-secondary"
              : "hover:text-white/80"
          }`}
        >
          HOME
        </Link>
        <Link
          href="/classes"
          className={`transition-colors ${
            isWhiteBackgroundPage
              ? "hover:text-secondary"
              : "hover:text-white/80"
          }`}
        >
          CLASSES
        </Link>
        <Link
          href="/yogo"
          className={`transition-colors ${
            isWhiteBackgroundPage
              ? "hover:text-secondary"
              : "hover:text-white/80"
          }`}
        >
          YOGO
        </Link>
        <Link
          href="/about"
          className={`transition-colors ${
            isWhiteBackgroundPage
              ? "hover:text-secondary"
              : "hover:text-white/80"
          }`}
        >
          SHOP
        </Link>
        <Link
          href="/contact"
          className={`transition-colors ${
            isWhiteBackgroundPage
              ? "hover:text-secondary"
              : "hover:text-white/80"
          }`}
        >
          ABOUT
        </Link>
        <Link
          href="/blog"
          className={`transition-colors ${
            isWhiteBackgroundPage
              ? "hover:text-secondary"
              : "hover:text-white/80"
          }`}
        >
          BLOG
        </Link>
        <Link
          href="/contact"
          className={`transition-colors ${
            isWhiteBackgroundPage
              ? "hover:text-secondary"
              : "hover:text-white/80"
          }`}
        >
          CONTACT
        </Link>
      </nav>
      <button
        className={`lg:hidden ${
          isWhiteBackgroundPage
            ? "text-primary bg-accent/30"
            : "text-white bg-primary/20 backdrop-blur-sm"
        } px-4 py-2 rounded-full font-medium ${
          isWhiteBackgroundPage ? "hover:bg-accent/50" : "hover:bg-primary/30"
        } transition-all`}
      >
        {/* Hamburger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Hidden on mobile, or can add a hamburger menu later */}
    </header>
  );
}
