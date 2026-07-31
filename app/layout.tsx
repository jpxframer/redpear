import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RedPear — The Entire Insurance Journey, Inside WhatsApp",
  description:
    "RedPear helps Africa's leading insurers sell policies, process claims, and serve customers on the app they already open every day. No downloads, no queues, no paperwork.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body className="font-sans">
        {/* Scroll reveal hides a section until JavaScript shows it, so with
            scripting off every one of them would stay invisible. This is the
            only guard for that case — see components/ui/Reveal.tsx. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1;transform:none;}`}</style>
        </noscript>

        {/* Navbar and Footer live here rather than in each page so they survive
            navigation instead of unmounting and rebuilding. The bar is sticky
            and measures its own height on mount, so remounting it per route was
            visibly tearing it down and putting it back — the flash this whole
            change set out to fix. Only `children` is swapped, and only that is
            animated (app/template.tsx). */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
