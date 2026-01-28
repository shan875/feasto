"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// 1. Import Image component
import Image from "next/image"; 
import { Menu, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore"; 
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { toggleCart, getItemCount } = useCartStore(); 
  const cartCount = getItemCount();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3 md:py-4" : "bg-transparent py-4 md:py-6"
    }`}>
      <div className="w-full px-4 md:px-12 flex items-center justify-between">
        
        {/* 2. Updated Logo Section - Replaced text with Image */}
        <Link href="/" className="flex items-center z-50 relative shrink-0">
           <Image 
             src="/images/logo121.png"
             alt="Lumina Eats Logo" 
             // Width and Height define the aspect ratio. 
             // The actual CSS classes determine the rendered size.
             width={120} 
             height={40} 
             // h-8 (32px) on mobile, h-10 (40px) on desktop to match previous text size
             className="h-8 md:h-10 w-auto object-contain transition-opacity hover:opacity-90"
             priority // Loads instantly as it's above the fold
           />
        </Link>

        {/* Desktop Links */}
        <div className={`hidden md:flex items-center gap-8 font-ui font-medium ${isScrolled ? "text-gray-600" : "text-white/90"}`}>
           {["Menu", "Offers", "Orders"].map((item) => (
             <Link key={item} href="#" className="hover:text-brand transition-colors text-sm font-bold tracking-wide">{item}</Link>
           ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
           {/* Cart Button */}
           <button 
             onClick={toggleCart} 
             className={`relative p-2.5 rounded-full transition-colors ${
               isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/20"
             }`}
           >
             <ShoppingBag size={22} />
             {mounted && cartCount > 0 && (
               <motion.span 
                 initial={{ scale: 0 }} animate={{ scale: 1 }}
                 className="absolute -top-0.5 -right-0.5 bg-brand text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
               >
                 {cartCount}
               </motion.span>
             )}
           </button>

           <button className={`px-6 py-2.5 rounded-full font-bold text-sm transition-colors shadow-lg ${
              isScrolled 
                ? "bg-gray-900 text-white hover:bg-black" 
                : "bg-white text-brand hover:bg-gray-50"
           }`}>
             Sign In
           </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-3">
            {/* Mobile Cart Icon */}
            <button 
             onClick={toggleCart} 
             className={`relative p-2 rounded-full transition-colors ${
                isScrolled || isMobileMenuOpen ? "text-gray-900" : "text-white"
             }`}
            >
             <ShoppingBag size={24} />
             {mounted && cartCount > 0 && (
               <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                 {cartCount}
               </span>
             )}
           </button>

           {/* Hamburger Toggle */}
           <button 
            className={`p-2 z-50 transition-colors ${isScrolled || isMobileMenuOpen ? "text-gray-900" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           >
             {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
           </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col pt-24 px-6 gap-6 shadow-xl md:hidden z-40"
          >
             {["Menu", "Offers", "Orders", "Partner with us"].map((item) => (
                <Link key={item} href="#" className="text-2xl font-heading font-bold text-gray-800 border-b border-gray-100 pb-4 flex justify-between items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  {item}
                  <ArrowRight size={20} className="text-brand" />
                </Link>
             ))}
             <div className="mt-4 flex flex-col gap-3">
               <button className="w-full py-4 bg-brand text-white rounded-xl font-bold text-lg shadow-lg shadow-brand/20 font-ui">Get the App</button>
               <button className="w-full py-4 border border-gray-200 text-gray-900 rounded-xl font-bold text-lg font-ui">Sign In</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}