import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FoodCard from "@/components/features/FoodCard";
import { getMealsByCategory } from "@/lib/api";
import Link from "next/link";

const categories = ["Seafood", "Beef", "Chicken", "Vegetarian", "Dessert", "Pasta"];

export default async function MenuPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category || "Beef";
  const meals = await getMealsByCategory(category);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="pt-32 pb-12 max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Our Menu</h1>
        
        {/* Category Filter */}
        <div className="flex overflow-x-auto gap-4 pb-8 no-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/menu?category=${cat}`}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                category === cat 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/25" 
                : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal: any) => (
             <FoodCard key={meal.id} {...meal} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}