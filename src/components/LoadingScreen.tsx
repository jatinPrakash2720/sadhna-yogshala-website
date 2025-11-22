"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Ensure component is mounted and visible before starting animations
    // Use requestAnimationFrame to ensure DOM is ready
    let timer: NodeJS.Timeout;
    let fadeOutTimer: NodeJS.Timeout;

    const rafId = requestAnimationFrame(() => {
      // Fade in animation (0.2s) - start immediately
      setFadeIn(true);

      // Loading screen shows for 1 second, then fades out
      timer = setTimeout(() => {
        setFadeOut(true);
        fadeOutTimer = setTimeout(() => {
          setIsLoading(false);
          onComplete?.();
        }, 500); // Fade out duration (0.5s)
      }, 1000); // 1 second loading time
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timer) clearTimeout(timer);
      if (fadeOutTimer) clearTimeout(fadeOutTimer);
    };
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-200 ease-in-out ${
        fadeOut ? "opacity-0" : fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Rotating Border Circle */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
          <Image
            src="/Sadhna (9) (1).png"
            alt=""
            width={320}
            height={320}
            className="w-full h-full object-contain animate-logo-rotate"
            priority
          />
        </div>

        {/* Center Logo Section */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
            <Image
              src="/Sadhna (8) (1).png"
              alt=""
              width={240}
              height={240}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
