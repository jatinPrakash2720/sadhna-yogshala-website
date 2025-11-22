import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YogoContent from "@/components/YogoContent";

export default function YogoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      <YogoContent />
      <Footer />
    </main>
  );
}

