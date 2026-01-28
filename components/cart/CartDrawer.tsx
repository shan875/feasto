"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/formatPrice";
import { AnimatePresence, motion } from "framer-motion";

export default function CartDrawer() {
  const { isOpen, toggleCart, items, updateQuantity, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                <ShoppingBag className="text-brand" /> Your Cart
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Scrollable Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center">
                    <Image 
                       src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" 
                       width={100} height={100} alt="Empty Cart" className="opacity-50"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                    <p className="text-gray-500 text-sm">Looks like you haven't added anything yet.</p>
                  </div>
                  <button onClick={toggleCart} className="px-6 py-2 bg-brand text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all">
                    Start Ordering
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                         <h4 className="font-heading font-semibold text-gray-900 text-sm line-clamp-2">{item.name}</h4>
                         <span className="font-ui font-bold text-gray-900 text-sm ml-2">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                         <p className="text-xs text-gray-400 font-ui">{formatPrice(item.price)} each</p>
                         
                         {/* Quantity Control */}
                         <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm h-8">
                            <button 
                               onClick={() => updateQuantity(item.id, -1)}
                               className="text-gray-500 hover:text-brand"
                            >
                                <Minus size={14} strokeWidth={3} />
                            </button>
                            <span className="font-bold text-brand text-sm w-4 text-center">{item.quantity}</span>
                            <button 
                               onClick={() => updateQuantity(item.id, 1)}
                               className="text-gray-500 hover:text-brand"
                            >
                                <Plus size={14} strokeWidth={3} />
                            </button>
                         </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout CTA */}
            {items.length > 0 && (
              <div className="p-5 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between mb-4 text-sm">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between mb-6 text-sm">
                  <span className="text-gray-600 font-medium">Delivery Fee</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                
                <Link 
                   href="/checkout"
                   onClick={toggleCart} 
                   className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg flex items-center justify-between px-6 hover:bg-black transition-colors shadow-lg"
                >
                   <span>Checkout</span>
                   <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg text-sm">
                      {formatPrice(getCartTotal())} <ArrowRight size={16} />
                   </span>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}