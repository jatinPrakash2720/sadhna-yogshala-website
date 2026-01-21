import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Pricing } from "@/components/ui/pricing";

const classesPlans = [
  {
    name: "STARTER",
    price: "50",
    yearlyPrice: "40",
    period: "per month",
    features: [
      "Up to 10 yoga classes per month",
      "Access to basic yoga practices",
      "48-hour support response time",
      "Community forum access",
      "Basic meditation sessions",
    ],
    description: "Perfect for beginners starting their yoga journey",
    buttonText: "Start Free Trial",
    href: "/login",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "99",
    yearlyPrice: "79",
    period: "per month",
    features: [
      "Unlimited yoga classes",
      "Access to all yoga practices & asanas",
      "24-hour support response time",
      "Priority booking for classes",
      "Advanced meditation sessions",
      "Personalized practice plans",
      "Live instructor sessions",
    ],
    description: "Ideal for regular practitioners and yoga enthusiasts",
    buttonText: "Get Started",
    href: "/login",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: [
      "Everything in Professional",
      "One-on-one private sessions",
      "1-hour support response time",
      "Custom practice programs",
      "Workshop & retreat access",
      "Advanced teacher training",
      "Nutrition & wellness guidance",
      "SLA agreement",
    ],
    description: "For dedicated practitioners and yoga teachers",
    buttonText: "Contact Us",
    href: "/contact",
    isPopular: false,
  },
];

export default function ClassesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      <Pricing
        plans={classesPlans}
        title="Yoga Classes & Membership"
        description="Choose the plan that works for you\nAll plans include access to our yoga practices, meditation sessions, and dedicated support."
      />
      <Footer />
    </main>
  );
}

