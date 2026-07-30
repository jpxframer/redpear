import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
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
      <body className="font-sans">{children}</body>
    </html>
  );
}
