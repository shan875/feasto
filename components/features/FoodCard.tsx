"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Clock, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/formatPrice";

interface FoodCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  veg?: boolean; // True for Veg, False for Non-veg
}

export default function FoodCard({ id, name, image, price, category, veg = true }: FoodCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  
  // Check if item is in cart
  const cartItem = items.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-transparent hover:border-gray-100 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-50 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Veg/Non-Veg Indicator */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1 rounded border border-gray-200 shadow-sm">
             <div className={`w-3 h-3 border-2 ${veg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center rounded-[2px]`}>
                <div className={`w-1.5 h-1.5 rounded-full ${veg ? 'bg-green-600' : 'bg-red-600'}`} />
             </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
           <h3 className="text-lg font-heading text-gray-900 leading-tight line-clamp-2 mb-1">{name}</h3>
           <p className="text-xs font-ui text-gray-500 mb-3">{category}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-ui font-bold text-gray-900">
              {formatPrice(price)}
            </span>

            {/* Premium Add Button Logic */}
            {quantity === 0 ? (
                <button
                  onClick={() => addItem({ id, name, price, image, veg })}
                  className="px-6 py-2 bg-white border border-gray-200 text-brand font-bold rounded-lg shadow-sm hover:bg-gray-50 active:scale-95 transition-all text-sm uppercase tracking-wide"
                >
                  Add
                </button>
            ) : (
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
                    <button 
                       onClick={() => updateQuantity(id, -1)}
                       className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-brand bg-gray-100 rounded hover:bg-brand/10 transition-colors"
                    >
                        <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="font-bold text-brand w-4 text-center">{quantity}</span>
                    <button 
                       onClick={() => updateQuantity(id, 1)}
                       className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-brand bg-gray-100 rounded hover:bg-brand/10 transition-colors"
                    >
                        <Plus size={14} strokeWidth={3} />
                    </button>
                </div>
            )}
        </div>
      </div>
    </motion.div>
  );
}