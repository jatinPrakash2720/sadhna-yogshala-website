import { AnimatedSignIn } from "@/components/ui/sign-in";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <AnimatedSignIn isLogin={false} />
    </main>
  );
}

