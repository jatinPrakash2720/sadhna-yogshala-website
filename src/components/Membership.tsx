import Image from "next/image";

export default function Membership() {
  return (
    <section className="relative w-full py-32 flex items-center justify-end px-8 md:px-20">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/membership-bg.png"
          alt="Yoga Stretch"
          fill
          className="object-cover object-center"
        />
        {/* Dark overlay for better contrast if needed, though design shows it bright */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Floating Card */}
      <div className="bg-white rounded-[40px] p-12 max-w-2xl shadow-2xl">
        <h2 className="text-5xl font-serif font-bold text-primary mb-8">
          Free 30-Day Membership
        </h2>
        <p className="text-secondary mb-10 leading-relaxed">
          At arcu neque aliquet laoreet. Id egestas mauris tincidunt ut nulla cras. Non eget sem curabitur vehicula diam integer. Magna tortor dignissim imperdiet pulvinar ante sed metus consequat in. Feugiat id ipsum lacinia nec nunc odio pellentesque.
        </p>
        
        <div className="flex items-center gap-8">
          <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg">
            Book A Session
          </button>
          <button className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors group">
            Contact Us
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
