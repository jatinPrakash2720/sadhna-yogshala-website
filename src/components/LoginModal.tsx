"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Logo from "@/components/Logo";
import { useUI } from "@/contexts/UIContext";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useUI();
  const [mounted, setMounted] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("google");
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("LoginModal - isLoginModalOpen changed:", isLoginModalOpen);
    if (isLoginModalOpen) {
      setMounted(true);
      setTimeout(() => setFormVisible(true), 100);
    } else {
      setFormVisible(false);
      setTimeout(() => setMounted(false), 300);
    }
  }, [isLoginModalOpen]);

  console.log("LoginModal render - mounted:", mounted, "isLoginModalOpen:", isLoginModalOpen);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300"
        onClick={closeLoginModal}
      />
      
      {/* Modal Content */}
      <div
        className={`relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 ${
          formVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <button
          onClick={closeLoginModal}
          className="absolute left-6 top-6 lg:left-10 lg:top-10 p-2 rounded-full border border-white/30 text-white hover:bg-white/20 transition-colors z-50 bg-black/20 backdrop-blur-sm shadow-sm"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="lg:w-5 lg:h-5 w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
        {/* Background Image */}
        <div className="relative w-full h-[400px] md:h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
            alt="Yoga practice"
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Bottom Content */}
          <div
            className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end p-6 pb-8 z-10"
            style={{
              transform: formVisible ? "translateY(0)" : "translateY(20px)",
              opacity: formVisible ? 1 : 0,
              transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
              transitionDelay: "0.2s",
            }}
          >
            <div className="flex justify-center mb-4">
              <Logo size={50} variant="white" />
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4 text-white text-center">
              Welcome Back
            </h1>
            
            <div className="w-full max-w-sm">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleGoogleLogin}
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-white py-3 px-6 text-sm font-medium text-primary hover:bg-white/90 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      style={{ fill: "var(--primary)" }}
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      style={{ fill: "var(--secondary)" }}
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      style={{ fill: "var(--accent)" }}
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      style={{ fill: "var(--primary)" }}
                    />
                  </svg>
                )}
                {isLoading ? "Signing in..." : "Continue with Google"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

