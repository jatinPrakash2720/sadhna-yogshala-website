import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import LatestClasses from "@/components/LatestClasses";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <div className="flex flex-col gap-20 pb-20">
        {/* <Services /> */}
        <LatestClasses />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}
