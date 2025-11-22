import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YogaContent from "@/components/YogaContent";

export default function YogaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      <YogaContent />
      <Footer />
    </main>
  );
}

