"use client";
import Image from "next/image";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { useUI } from "@/contexts/UIContext";

const yogaMediaItems = [
  {
    id: 1,
    type: "image",
    title: "Meditation Practice",
    desc: "Find inner peace and tranquility",
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "Yoga Flow",
    desc: "Fluid movements and breath",
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Nature Yoga",
    desc: "Connect with nature",
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Sunrise Practice",
    desc: "Begin your day mindfully",
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Balancing Poses",
    desc: "Strength and stability",
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6,
    type: "image",
    title: "Group Session",
    desc: "Practice together",
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "Evening Relaxation",
    desc: "Wind down peacefully",
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
];

export default function Hero() {
  const { openLoginModal } = useUI();

  return (
    <section className="relative w-full min-h-screen flex flex-col">
      {/* Hero Content Section */}
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/mountain-hero.png"
            alt="Mountain Yoga Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="max-w-4xl mx-auto px-8 w-full text-center text-white z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-8 leading-tight tracking-wide">
            YOU CANNOT DO YOGA <br />
            <span className="font-normal">YOGA IS YOUR NATURAL STATE</span>
          </h1>

          <button
            onClick={openLoginModal}
            className="inline-block bg-primary text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-opacity-90 transition-all shadow-lg uppercase mt-8"
          >
            Join Now
          </button>
        </div>

        {/* Navigation Arrows (Visual) */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer hidden md:block z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-16 h-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer hidden md:block z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-16 h-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
        </div>
      </div>

      {/* Interactive Bento Gallery Section */}
      <div className="w-full bg-white py-24 md:py-32">
        <InteractiveBentoGallery
          mediaItems={yogaMediaItems}
          title="Explore Our Yoga Journey"
          description="Drag and explore our curated collection of yoga practices and moments"
        />
      </div>
    </section>
  );
}
