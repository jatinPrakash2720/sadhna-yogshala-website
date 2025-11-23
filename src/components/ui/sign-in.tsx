"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

interface SignInProps {
  isLogin?: boolean;
}

export const AnimatedSignIn = ({ isLogin = false }: SignInProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setFormVisible(true), 300);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      console.log(isLogin ? "Login attempt" : "Sign in attempt", {
        email,
        password,
      });
      setIsLoading(false);
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen mt-20 w-full bg-white">
      <div className="flex items-center justify-center p-4 md:p-6 relative">
        <div
          className={`w-full max-w-md md:max-w-lg lg:max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 ${
            formVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <button
            onClick={() => router.back()}
            className="absolute left-6 top-6 lg:left-10 lg:top-10 p-2 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors z-50 bg-white shadow-sm"
            aria-label="Go back"
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <div className="flex flex-col lg:flex-row">
            <div className="hidden lg:block w-full lg:w-3/5 bg-accent/10 p-8">
              <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full overflow-hidden">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
                    alt="Yoga practice"
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>

                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
                    alt="Yoga class"
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>

                <div
                  className="rounded-2xl flex flex-col justify-center items-center p-6 text-white bg-secondary"
                  style={{
                    transform: formVisible
                      ? "translateY(0)"
                      : "translateY(20px)",
                    opacity: formVisible ? 1 : 0,
                    transition:
                      "transform 0.6s ease-out, opacity 0.6s ease-out",
                    transitionDelay: "0.4s",
                  }}
                >
                  <h2 className="text-5xl font-serif font-bold mb-2">500+</h2>
                  <p className="text-center text-sm">
                    Active members practicing yoga and meditation with us.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
                    alt="Nature"
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
              </div>
            </div>

            <div
              className="w-full lg:w-2/5 p-6 md:p-8 lg:p-12 bg-white text-primary"
              style={{
                transform: formVisible ? "translateX(0)" : "translateX(20px)",
                opacity: formVisible ? 1 : 0,
                transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
              }}
            >
              <div className="mb-6 md:mb-8">
                <div className="flex justify-center mb-4">
                  <Logo size={60} variant="green" />
                </div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-primary text-center">
                  {isLogin ? "Welcome Back" : "Join Sadhana Yogshala"}
                </h1>
                <p className="text-sm text-secondary text-center">
                  {isLogin
                    ? "Sign in to continue your yoga journey with us."
                    : "Create your account to access our yoga classes and practices."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary"
                  >
                    Email Address
                  </label>
                  <div className="relative rounded-lg shadow-sm transition-all duration-300">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-lg border border-accent/30 bg-white py-3 px-4 text-primary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-primary"
                  >
                    Password
                  </label>
                  <div className="relative rounded-lg shadow-sm transition-all duration-300">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-lg border border-accent/30 bg-white py-3 px-4 pr-10 text-primary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-secondary hover:text-primary transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <Link
                      href="#"
                      className="text-sm font-medium text-primary hover:text-secondary transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex w-full justify-center rounded-lg py-3 px-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 bg-primary hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isLoading ? "cursor-not-allowed opacity-70" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {isLogin ? "Logging in..." : "Signing up..."}
                    </span>
                  ) : (
                    <span>{isLogin ? "Login" : "Sign Up"}</span>
                  )}
                </button>

                <div className="relative flex items-center py-2">
                  <div className="grow border-t border-accent/30"></div>
                  <span className="shrink mx-4 text-sm text-secondary">OR</span>
                  <div className="grow border-t border-accent/30"></div>
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-accent/30 bg-white py-3 px-4 text-sm font-medium text-primary hover:bg-accent/10 transition-colors"
                >
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
                  Continue with Google
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-accent/30 bg-white py-3 px-4 text-sm font-medium text-primary hover:bg-accent/10 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.336.104 2.715-.688 3.559-1.701" />
                  </svg>
                  Continue with Apple
                </button>

                <div className="flex justify-center mt-6">
                  <p className="text-sm text-secondary">
                    {isLogin
                      ? "Don't have an account? "
                      : "Already have an account? "}
                    <Link
                      href={isLogin ? "/sign-in" : "/login"}
                      className="ml-1 font-medium text-primary hover:text-secondary transition-colors"
                    >
                      {isLogin ? "Sign up" : "Login"}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
