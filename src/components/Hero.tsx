import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center">
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

      <div className="max-w-4xl mx-auto px-8 w-full text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-8 leading-tight tracking-wide">
          YOU CANNOT DO YOGA <br />
          <span className="font-normal">YOGA IS YOUR NATURAL STATE</span>
        </h1>
        
        <Link
          href="/sign-in"
          className="inline-block bg-primary text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-opacity-90 transition-all shadow-lg uppercase mt-8"
        >
          Join Now
        </Link>
      </div>
      
      {/* Navigation Arrows (Visual) */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        <div className="w-2 h-2 rounded-full bg-white"></div>
        <div className="w-2 h-2 rounded-full bg-white/50"></div>
        <div className="w-2 h-2 rounded-full bg-white/50"></div>
      </div>
    </section>
  );
}
