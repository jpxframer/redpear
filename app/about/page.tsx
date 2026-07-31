import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";

export const metadata: Metadata = {
  title: "About — RedPear",
  description:
    "RedPear Communications helps insurance organizations embrace digital transformation through intelligent platforms, AI-powered solutions, and customer-first experiences that drive measurable business impact.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
      </main>
      <Footer />
    </>
  );
}
