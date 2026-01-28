"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, ChevronDown, Menu, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore"; 

// --- Types ---
type CardVariant = "orange" | "green" | "purple";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  variant: CardVariant;
  delay: number;
}

// --- Configuration ---
const VARIANTS = {
  orange: {
    bg: "bg-orange-50",
    badge: "bg-orange-100 text-orange-800",
    button: "group-hover:text-orange-700",
    border: "hover:border-orange-200",
  },
  green: {
    bg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-800",
    button: "group-hover:text-emerald-700",
    border: "hover:border-emerald-200",
  },
  purple: {
    bg: "bg-violet-50",
    badge: "bg-violet-100 text-violet-800",
    button: "group-hover:text-violet-700",
    border: "hover:border-violet-200",
  },
};

// --- Components ---
const ServiceCard = ({ title, subtitle, discount, image, variant, delay }: ServiceCardProps) => {
  const styles = VARIANTS[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className={`relative w-full overflow-hidden rounded-[2rem] p-6 sm:p-8 cursor-pointer transition-all duration-300 border border-transparent ${styles.bg} ${styles.border} shadow-sm hover:shadow-xl group`}
    >
      <div className="relative z-10 flex flex-col items-start h-full justify-between min-h-[160px]">
        <div>
          <span className={`inline-block px-3 py-1 mb-3 text-[11px] font-extrabold uppercase tracking-widest rounded-full ${styles.badge} font-sans`}>
            {discount}
          </span>
          <h3 className="text-2xl font-brand text-gray-900 leading-tight mb-1 tracking-tight">{title}</h3>
          <p className="text-gray-500 font-medium text-sm font-sans">{subtitle}</p>
        </div>

        <div className={`mt-6 flex items-center font-bold text-sm transition-colors duration-300 text-gray-900 ${styles.button} font-sans`}>
          Order Now
          <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      <div className="absolute -bottom-6 -right-6 w-36 h-36 sm:w-44 sm:h-44 transition-transform duration-500 ease-out hover:scale-110">
         <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover drop-shadow-2xl rounded-full"
         />
      </div>
    </motion.div>
  );
};

export default function HeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleCart, getItemCount } = useCartStore(); 
  const cartCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full bg-brand overflow-hidden font-sans min-h-[800px]">
      
      {/* ==================================================================
          BACKGROUND FOOD LAYERS
         ================================================================== */}
      
      <motion.div 
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[20%] -left-20 w-[400px] h-[400px] hidden xl:block z-0 pointer-events-none"
      >
        <div className="relative w-full h-full">
           <Image 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" 
              alt="Healthy Food Background"
              fill
              className="object-cover rounded-full opacity-40 mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-brand/90 to-transparent rounded-full" />
        </div>
      </motion.div>

      <motion.div 
         animate={{ y: [10, -10, 10] }}
         transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
         className="absolute top-[15%] -right-24 md:-right-32 w-[350px] h-[350px] md:w-[500px] md:h-[500px] hidden md:block z-0 pointer-events-none"
      >
        <div className="relative w-full h-full">
           <Image 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" 
              alt="Burger Background"
              fill
              className="object-cover rounded-full opacity-30 mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-gradient-to-l from-brand/90 to-transparent rounded-full" />
        </div>
      </motion.div>

      {/* ================================================================== */}

      {/* --- 1. Top Navigation --- */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm py-4" 
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="w-full px-4 md:px-12 flex items-center justify-between">
          
          {/* UPDATED: Logo Section (Replaced Text with Image) */}
          <Link href="/" className="flex items-center gap-1 z-50 group relative shrink-0">
             <Image 
               src="/images/logo121.png"
               alt="Lumina Eats"
               width={120}
               height={40}
               className="h-8 md:h-10 w-auto object-contain transition-opacity hover:opacity-90"
               priority
             />
          </Link>

          {/* Desktop Links */}
          <div className={`hidden md:flex items-center gap-8 text-[15px] ${isScrolled ? "text-gray-600" : "text-white/90"}`}>
            {["Menu", "Offers", "Orders", "Partner with us"].map((item) => (
              <Link key={item} href="#" className="relative group py-2 font-semibold tracking-tight hover:text-white/80 transition-all duration-300">
                <span className={`group-hover:tracking-wide transition-all duration-300 ${isScrolled ? "hover:text-brand" : ""}`}>{item}</span>
                <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-1/2 ${isScrolled ? "bg-brand" : "bg-white"}`} />
              </Link>
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
             {cartCount > 0 && (
               <motion.span 
                 initial={{ scale: 0 }} animate={{ scale: 1 }}
                 className="absolute -top-0.5 -right-0.5 bg-brand text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
               >
                 {cartCount}
               </motion.span>
             )}
            </button>

            <button className={`px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-colors ${
              isScrolled 
                ? "bg-gray-900 text-white hover:bg-black" 
                : "bg-black/20 backdrop-blur-sm text-white border border-white/20 hover:bg-black/40"
            }`}>
              Sign In
            </button>
          </div>

          {/* Mobile Actions (Cart + Menu) */}
          <div className="flex md:hidden items-center gap-3">
             {/* Mobile Cart Icon */}
             <button 
              onClick={toggleCart} 
              className={`relative p-2 rounded-full transition-colors z-50 ${
                 isScrolled || isMobileMenuOpen ? "text-gray-900" : "text-white"
              }`}
             >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85%] max-w-sm h-screen bg-white shadow-2xl md:hidden z-40 flex flex-col pt-28 px-8"
            >
               <div className="flex flex-col gap-6 text-xl font-bold text-gray-800 font-brand">
                 {["Menu", "Offers", "Orders", "Partner with us"].map((item) => (
                    <Link key={item} href="#" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-4 flex justify-between group items-center">
                      <span className="font-brand text-2xl tracking-tight">{item}</span>
                      <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand" />
                    </Link>
                 ))}
               </div>
               <div className="mt-auto mb-10 space-y-4">
                 <button className="w-full py-4 bg-brand text-white rounded-2xl font-bold text-lg shadow-lg shadow-brand/20 tracking-wide font-ui">Get the App</button>
                 <button className="w-full py-4 border-2 border-gray-100 text-gray-900 rounded-2xl font-bold text-lg hover:bg-gray-50 tracking-wide font-ui">Sign In</button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Main Hero Content --- */}
      <div className="relative pt-32 pb-12 md:pt-48 md:pb-32 px-4 md:px-12 w-full max-w-[1440px] mx-auto flex flex-col items-center text-center z-10">
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-brand text-white leading-[1.1] mb-10 drop-shadow-sm tracking-tight"
        >
          Order food & groceries. <br className="hidden md:block" />
          <span className="text-white/90">Find the best meals near you.</span>
        </motion.h1>

        {/* --- Responsive Search Bar --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-4xl bg-white p-3 rounded-[2rem] shadow-float flex flex-col md:flex-row gap-2 relative z-20"
        >
          {/* Location Input */}
          <div className="relative w-full md:flex-[0.35] border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0">
             <div className="absolute left-5 top-1/2 -translate-y-1/2 text-brand">
               <MapPin size={22} className="fill-brand/10" />
             </div>
             <input 
               type="text" 
               placeholder="New York, NY" 
               className="w-full h-12 md:h-14 pl-12 md:pl-14 pr-4 rounded-xl text-gray-900 placeholder:text-gray-400 font-bold focus:outline-none focus:bg-gray-50 transition-colors text-base font-sans tracking-tight truncate"
             />
             <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-brand transition-colors">
               <ChevronDown size={18} />
             </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:flex-[0.65]">
             <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
               <Search size={22} />
             </div>
             <input 
               type="text" 
               placeholder="Search for restaurant, item..." 
               className="w-full h-12 md:h-14 pl-12 md:pl-14 pr-4 rounded-xl text-gray-900 placeholder:text-gray-400 font-medium focus:outline-none focus:bg-gray-50 transition-colors text-base font-sans tracking-tight"
             />
             
             {/* Desktop Search Button */}
             <button className="hidden md:block absolute right-2 top-2 bottom-2 bg-gradient-to-r from-brand to-orange-600 hover:to-brand text-white px-8 rounded-full font-bold transition-all shadow-md shadow-brand/20 hover:shadow-lg hover:scale-105 active:scale-95 tracking-wide font-ui">
               Search
             </button>
          </div>
          
          {/* Mobile Search Button (Full Width) */}
          <button className="md:hidden w-full h-12 bg-brand text-white rounded-xl font-bold text-lg shadow-lg shadow-brand/20 mt-1 tracking-wide font-ui flex items-center justify-center gap-2">
            Find Food <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* --- Service Cards --- */}
        <div className="w-full mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard 
              variant="orange"
              title="Food Delivery"
              subtitle="From top restaurants"
              discount="UP TO 60% OFF"
              image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=500"
              delay={0.3}
            />
            <ServiceCard 
              variant="green"
              title="Instamart"
              subtitle="Instant Grocery"
              discount="FREE DELIVERY"
              image="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=500"
              delay={0.4}
            />
            <ServiceCard 
              variant="purple"
              title="Dineout"
              subtitle="Eat out & save more"
              discount="FLAT 40% OFF"
              image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=500"
              delay={0.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}