import { AnimatedSignIn } from "@/components/ui/sign-in";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <AnimatedSignIn isLogin={true} />
    </main>
  );
}

