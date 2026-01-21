"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { useUI } from "@/contexts/UIContext";

export default function Header() {
  const pathname = usePathname();
  const { openLoginModal } = useUI();
  const isHomePage = pathname === "/";
  const isYogaPage = pathname === "/yoga";
  const isClassesPage = pathname === "/classes";
  const isWhiteBackgroundPage =
    isYogaPage || isClassesPage;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`${
        isWhiteBackgroundPage ? "relative bg-white" : "absolute right-0"
      } top-0 left-0 w-full z-50 py-6 px-8 flex items-center justify-between max-w-7xl mx-auto`}
    >
      <div className="flex items-center gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo
            size={40}
            className="drop-shadow-sm"
            variant={isHomePage ? "white" : "green"}
          />
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
          href="/yoga"
          className={`transition-colors ${
            isWhiteBackgroundPage
              ? "hover:text-secondary"
              : "hover:text-white/80"
          }`}
        >
          YOGA
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
          href="/contact"
          className={`transition-colors ${
            isWhiteBackgroundPage
              ? "hover:text-secondary"
              : "hover:text-white/80"
          }`}
        >
          CONTACT
        </Link>
        <Link
          href="/dashboard"
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
            isWhiteBackgroundPage
              ? "bg-accent/30 text-primary hover:bg-accent/50"
              : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          }`}
        >
          DASHBOARD
        </Link>
        <Link
          href="/owner"
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
            isWhiteBackgroundPage
              ? "bg-accent/30 text-primary hover:bg-accent/50"
              : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          }`}
        >
          OWNER
        </Link>
        <button
          onClick={openLoginModal}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
            isWhiteBackgroundPage
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          }`}
        >
          LOGIN
        </button>
      </nav>
      <div className="flex items-center gap-3 lg:hidden">
        <Link
          href="/dashboard"
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
            isWhiteBackgroundPage
              ? "bg-accent/30 text-primary hover:bg-accent/50"
              : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          }`}
        >
          DASHBOARD
        </Link>
        <Link
          href="/owner"
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
            isWhiteBackgroundPage
              ? "bg-accent/30 text-primary hover:bg-accent/50"
              : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          }`}
        >
          OWNER
        </Link>
        <button
          onClick={openLoginModal}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
            isWhiteBackgroundPage
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          }`}
        >
          LOGIN
        </button>
        <button
          onClick={() => setIsMenuOpen(true)}
          className={`${
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
      </div>

      {/* Side Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Side Menu Panel */}
          <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-[101] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-primary/10">
                <div className="flex items-center gap-3">
                  <Logo size={40} variant="green" />
                  <div className="flex flex-col">
                    <span className="font-serif text-xl font-bold text-primary leading-none">
                      Sadhana Yogshala
                    </span>
                    <span className="text-xs text-secondary uppercase tracking-wider">
                      Yoga Studio
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-primary hover:text-secondary transition-colors p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-6 gap-4 flex-1">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium py-3 px-4 rounded-lg transition-colors ${
                    pathname === "/"
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-accent/30"
                  }`}
                >
                  HOME
                </Link>
                <Link
                  href="/classes"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium py-3 px-4 rounded-lg transition-colors ${
                    pathname === "/classes"
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-accent/30"
                  }`}
                >
                  CLASSES
                </Link>
                <Link
                  href="/yoga"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium py-3 px-4 rounded-lg transition-colors ${
                    pathname === "/yoga"
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-accent/30"
                  }`}
                >
                  YOGA
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium py-3 px-4 rounded-lg transition-colors ${
                    pathname === "/contact"
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-accent/30"
                  }`}
                >
                  ABOUT
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium py-3 px-4 rounded-lg transition-colors ${
                    pathname === "/contact"
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-accent/30"
                  }`}
                >
                  CONTACT
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium py-3 px-4 rounded-lg transition-colors bg-accent/30 text-primary hover:bg-accent/50"
                >
                  DASHBOARD
                </Link>
                <Link
                  href="/owner"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium py-3 px-4 rounded-lg transition-colors bg-accent/30 text-primary hover:bg-accent/50"
                >
                  OWNER
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openLoginModal();
                  }}
                  className="text-lg font-medium py-3 px-4 rounded-lg transition-colors mt-auto bg-primary text-white hover:bg-primary/90"
                >
                  LOGIN
                </button>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
