import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen block bg-background">
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
