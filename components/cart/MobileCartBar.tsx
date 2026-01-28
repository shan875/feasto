"use client";

import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/formatPrice";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileCartBar() {
  const { items, getCartTotal, toggleCart } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
      >
        <button 
          onClick={toggleCart}
          className="w-full bg-brand text-white p-4 rounded-xl shadow-xl flex items-center justify-between"
        >
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold uppercase opacity-90">{totalItems} Items added</span>
            <span className="text-lg font-black">{formatPrice(getCartTotal())}</span>
          </div>
          <div className="flex items-center gap-2 font-bold">
            View Cart <ShoppingBag size={18} />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}