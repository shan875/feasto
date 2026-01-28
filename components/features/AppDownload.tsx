"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// --- Custom Icon Components ---

const AppleLogo = () => (
  <svg viewBox="0 0 384 512" fill="currentColor" height="28" width="28">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 82.6 54.4 230.2 126.4 230.2 28.2 0 43.8-23.5 82.4-23.5 37.3 0 54.7 23.5 83.7 23.5 29.2 0 58.1-43.8 80-81.5 1.1-1.9 2.2-3.9 3.2-5.9-46.5-21.7-79-67-79-145.4zm-64-167.6c18.5-24.8 32-55.9 28.5-88-29.3 2.1-59.5 20.2-76.8 43-16.1 20.9-29.2 53-26.1 84.7 30.8 2.2 59.8-19.1 74.4-39.7z" />
  </svg>
);

const GooglePlayLogo = () => (
  <svg viewBox="0 0 512 512" height="26" width="26">
    <path fill="#4285F4" d="M32.5 13.9C30.3 15.6 29 18.5 29 22.3v467.4c0 3.8 1.3 6.7 3.5 8.4l246.3-242.3L32.5 13.9z" />
    <path fill="#34A853" d="M278.8 255.8L46.4 498.2c6.4 2.4 13.7 1 19.3-3.6l276.4-158-63.3-80.8z" />
    <path fill="#FBBC05" d="M342.1 255.8l112.3 80.9c17.5 10 32.7 5.7 32.7-8.9V184.2c0-14.6-15.2-18.9-32.7-8.9L342.1 255.8z" />
    <path fill="#EA4335" d="M278.8 255.8l63.3-80.8L65.7 17.4C60.1 12.8 52.8 11.4 46.4 13.8l232.4 242z" />
  </svg>
);

export default function AppDownload() {
  return (
    <section className="w-full bg-white py-24 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
        
        {/* --- Left: Text Content --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-left space-y-8 z-10"
        >
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest">
              Get the App
            </span>
            
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              From craving to <br className="hidden md:block"/>
              <span className="text-brand">doorstep in minutes.</span>
            </h2>
            
            <p className="text-lg text-gray-500 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Experience the fastest delivery in town. Get live tracking, exclusive app-only discounts, and personalized meal recommendations.
            </p>
          </div>

          {/* Store Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            {/* Apple Store Button (Official Style) */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20 w-full sm:w-auto min-w-[180px]"
            >
              <AppleLogo />
              <div className="text-left flex flex-col leading-none">
                <span className="text-[10px] text-gray-300 font-medium">Download on the</span>
                <span className="text-lg font-bold tracking-tight">App Store</span>
              </div>
            </motion.button>

            {/* Google Play Button (Official Style) */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20 w-full sm:w-auto min-w-[180px]"
            >
              <GooglePlayLogo />
              <div className="text-left flex flex-col leading-none">
                <span className="text-[10px] text-gray-300 font-medium">GET IT ON</span>
                <span className="text-lg font-bold tracking-tight">Google Play</span>
              </div>
            </motion.button>
          </div>

          {/* Trust Metric */}
          <div className="pt-4 flex items-center justify-center md:justify-start gap-6 text-sm font-medium text-gray-500">
            <div className="flex items-center gap-2">
               <span className="text-brand font-bold text-xl">4.9</span>
               <span>★ App Store Rating</span>
            </div>
            <div className="w-px h-4 bg-gray-300" />
            <div>
               <span className="text-gray-900 font-bold">1M+</span> Downloads
            </div>
          </div>
        </motion.div>

        {/* --- Right: Visual (Floating Phone) --- */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative w-full flex justify-center md:justify-end"
        >
          {/* Phone Mockup */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-[280px] md:w-[320px] aspect-[9/19] bg-black rounded-[3rem] border-[12px] border-black overflow-hidden shadow-2xl shadow-brand/20 z-10"
          >
             {/* Screen Content */}
             <div className="relative w-full h-full bg-gray-900">
               
               {/* NEW: In-App Discount Banner (Moved Inside) */}
               <div className="absolute top-8 left-0 bg-brand text-white py-3 px-5 rounded-r-full shadow-md z-20 flex items-center gap-2">
                  <span className="text-xl font-black leading-none">50%</span>
                  <span className="text-xs font-bold uppercase leading-tight">OFF<br/>First Order</span>
               </div>

               {/* Image */}
               <Image 
                 src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop" 
                 alt="App Screen Interface" 
                 fill
                 className="object-cover"
               />
               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-6 pb-16">
                  <div className="text-white space-y-2">
                    <p className="text-sm font-medium text-brand uppercase tracking-wider">Trending Now</p>
                    <p className="font-extrabold text-2xl leading-tight">Italian Stone Oven Pizza</p>
                    <div className="flex items-center gap-3 text-sm opacity-90">
                       <span>$$$</span><span>•</span><span>25-35 min</span><span>•</span><span className="text-brand">Free Delivery</span>
                    </div>
                  </div>
               </div>
             </div>
          </motion.div>

          {/* Floating Notification Card (Kept outside for depth) */}
          <motion.div 
            animate={{ y: [0, 20, 0], opacity: [0.9, 1, 0.9] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            className="absolute top-24 -right-4 md:-right-12 bg-white p-4 rounded-2xl shadow-float z-30 max-w-[200px] flex items-center gap-3 border border-gray-100"
          >
              <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-xl">🛵</div>
              <div>
                <p className="text-xs font-bold text-gray-900 leading-none mb-1">Order Picked Up</p>
                <p className="text-[10px] text-gray-500 leading-tight">Driver is 4 mins away...</p>
              </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}