import HeroSection from "@/components/hero/HeroSection";
import CategoryCarousel from "@/components/features/CategoryCarousel";
import Footer from "@/components/layout/Footer";
import FoodCard from "@/components/features/FoodCard";
import AppDownload from "@/components/features/AppDownload";
import { getMealsByCategory } from "@/lib/api";
// import { Link } from "next/link"; // Note: standard import is usually just 'next/link' but keeping consistent if you had named export issues, otherwise standard is: import Link from "next/link";

// Checking standard Next.js Link import:
import NextLink from "next/link"; 

export default async function Home() {
  const popularMeals = await getMealsByCategory("Seafood");
  const trendingMeals = await getMealsByCategory("Chicken");

  return (
    <main className="min-h-screen bg-offwhite">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Collections Section (Infinite Carousel) */}
      <CategoryCarousel />

      {/* 3. Top Rated Section (UPDATED TYPOGRAPHY) */}
      <section className="py-12 w-full max-w-[1440px] mx-auto px-4 md:px-12 pb-24">
        
        {/* Premium Section Header */}
        <div className="flex items-end justify-between mb-8">
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-brand font-ui font-bold text-xs tracking-widest uppercase">
                    <span className="w-6 h-[2px] bg-brand"></span>
                    Curated For You
                </div>
                <h2 className="text-3xl md:text-4xl font-heading text-gray-900 tracking-tight leading-none">
                    Top Rated Near You
                </h2>
            </div>
        </div>

        {/* Elegant Tabs */}
        <div className="flex gap-6 mb-10 border-b border-gray-100 pb-1 overflow-x-auto no-scrollbar">
            <button className="relative pb-3 text-brand font-ui font-semibold text-sm tracking-wide transition-all">
                Delivery
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand shadow-sm"></span>
            </button>
            <button className="pb-3 text-gray-400 font-ui font-medium text-sm tracking-wide hover:text-gray-900 transition-colors">
                Dining Out
            </button>
            <button className="pb-3 text-gray-400 font-ui font-medium text-sm tracking-wide hover:text-gray-900 transition-colors">
                Nightlife
            </button>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {[...popularMeals, ...trendingMeals].slice(0, 8).map((meal: any) => (
            <FoodCard key={meal.id} {...meal} />
          ))}
        </div>

        {/* See All Button */}
        <div className="mt-12 flex justify-center">
            <NextLink 
                href="/menu" 
                className="w-full md:w-auto text-center px-12 py-3 md:py-4 bg-white border border-gray-300 text-gray-900 font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm font-ui tracking-wide"
            >
                See All Restaurants
            </NextLink>
        </div>
      </section>

      {/* 4. App Download Banner */}
      <AppDownload />

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}