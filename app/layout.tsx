import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NatureBackground from "@/components/NatureBackground";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "test",
  // Keep the site out of search engine results.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <NatureBackground />
        <RevealOnScroll />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
