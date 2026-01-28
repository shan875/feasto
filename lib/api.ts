// src/lib/api.ts
const getPrice = (id: string) => {
  const seed = parseInt(id.substring(0, 5), 10) || 12345;
  return (seed % 20) + 12; 
};

export async function getMealsByCategory(category: string) {
  // Map UI categories to API categories where possible, or use search
  const endpoint = category === 'Burgers' || category === 'Pizza' 
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`
    : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  const res = await fetch(endpoint);
  const data = await res.json();
  
  return (data.meals || []).slice(0, 8).map((meal: any) => ({
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    price: getPrice(meal.idMeal),
    category,
  }));
}