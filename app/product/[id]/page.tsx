import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Star, Clock, Flame } from "lucide-react";

// Pseudo-fetch for detail (TheMealDB lookup.php would be used here normally)
async function getMealDetail(id: string) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const meal = await getMealDetail(params.id);
  
  if (!meal) return <div className="pt-32 text-center">Item not found</div>;

  const price = (parseInt(meal.idMeal.substring(0, 3)) % 20) + 15;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <Image src={meal.strMealThumb} alt={meal.strMeal} fill className="object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center space-y-6">
          <span className="text-primary font-bold tracking-wide uppercase text-sm">{meal.strCategory}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{meal.strMeal}</h1>
          <div className="flex items-center gap-6 text-gray-500 text-sm font-medium">
            <span className="flex items-center gap-1"><Star size={18} className="text-yellow-400 fill-yellow-400"/> 4.8</span>
            <span className="flex items-center gap-1"><Clock size={18} /> 25-35 min</span>
            <span className="flex items-center gap-1"><Flame size={18} /> 420 kcal</span>
          </div>
          <p className="text-gray-500 leading-relaxed text-lg">
             Experience the rich flavors of our {meal.strMeal}. Prepared with premium ingredients
             sourced from local farms, this dish is a customer favorite.
          </p>
          
          <div className="flex items-center gap-6 pt-6">
            <span className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</span>
            <button className="flex-1 bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-all shadow-xl shadow-primary/20">
              Add to Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}