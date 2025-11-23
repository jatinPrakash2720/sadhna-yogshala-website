import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatedSignIn } from "@/components/ui/sign-in";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* <Header /> */}
      <AnimatedSignIn isLogin={false} />
      {/* <Footer /> */}
    </main>
  );
}

