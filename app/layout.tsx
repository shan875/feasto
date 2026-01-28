import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/cart/CartDrawer";
import MobileCartBar from "@/components/cart/MobileCartBar";

// 1. Elegant Serif for Headings
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"], // Regular weight is enough for display fonts
  variable: "--font-heading",
});

// 2. Clean Sans for UI
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
});

export const metadata: Metadata = {
  title: "Lumina Eats",
  description: "Premium Food Delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSerif.variable} ${jakarta.variable} font-ui antialiased text-gray-900`}>
        {children}
        
        {/* Global Cart Components */}
        <CartDrawer />
        <MobileCartBar />
      </body>
    </html>
  );
}