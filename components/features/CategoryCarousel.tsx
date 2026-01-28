"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// --- Mock Data (Replace with API) ---
const CATEGORIES = [
  { id: 1, name: "Biryani", image: "https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg" },
  { id: 2, name: "Burger", image: "https://www.themealdb.com/images/media/meals/k420tj1585565244.jpg" },
  { id: 3, name: "Pizza", image: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg" },
  { id: 4, name: "Sushi", image: "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg" },
  { id: 5, name: "Pasta", image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" },
  { id: 6, name: "Dessert", image: "https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg" },
  { id: 7, name: "Salad", image: "https://www.themealdb.com/images/media/meals/1529446137.jpg" },
  { id: 8, name: "Tacos", image: "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg" },
];

export default function CategoryCarousel() {
  // We duplicate the array to create the infinite loop effect
  const carouselItems = [...CATEGORIES, ...CATEGORIES];

  return (
    <section className="w-full py-12 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-8">
        <h2 className="text-2xl md:text-3xl font-brand font-bold text-gray-900 tracking-tight">
          What's on your mind?
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Explore our most popular categories
        </p>
      </div>

      {/* --- Carousel Track --- */}
      <div className="relative w-full">
        {/* Gradient Masks for Premium Fade Effect */}
        <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* The Moving Track 
            - animate-scroll: Handles the movement
            - hover:pause: Stops on desktop hover
            - active:pause: Stops on mobile touch/hold
        */}
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused] active:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
          {carouselItems.map((item, index) => (
            <Link 
              key={`${item.id}-${index}`} 
              href={`/menu?category=${item.name}`}
              className="group flex flex-col items-center justify-center gap-4 mx-4 md:mx-8 w-[100px] md:w-[140px] flex-shrink-0 py-4 transition-transform hover:scale-105"
            >
              {/* Image Container */}
              <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden shadow-soft border-4 border-transparent group-hover:border-brand/20 transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 96px, 144px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Label */}
              <span className="text-sm md:text-lg font-bold text-gray-700 group-hover:text-brand transition-colors font-brand tracking-wide">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}