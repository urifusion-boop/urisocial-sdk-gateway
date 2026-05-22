import type { Metadata } from "next";
import { Urbanist, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "URI Social SDK - Multi-Tenant Social Media Management",
  description: "Enterprise-grade SDK for building multi-tenant social media management applications. Embed social posting, analytics, and automation in your product.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={urbanist.className}>{children}</body>
    </html>
  );
}
