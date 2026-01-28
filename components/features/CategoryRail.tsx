"use client";
import { motion } from "framer-motion";

const categories = [
  { id: 'Seafood', label: 'Seafood', icon: '🦐' },
  { id: 'Burgers', label: 'Burgers', icon: '🍔' },
  { id: 'Pasta', label: 'Pasta', icon: '🍝' },
  { id: 'Dessert', label: 'Dessert', icon: '🍰' },
  { id: 'Vegan', label: 'Vegan', icon: '🥗' },
];

export default function CategoryRail() {
  return (
    <div className="w-full overflow-x-auto pb-4 pt-2 no-scrollbar">
      <div className="flex gap-4 min-w-max px-6 md:px-0">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ y: -2, backgroundColor: "var(--zinc-100)" }}
            className="flex flex-col items-center justify-center gap-2 min-w-[100px] h-[100px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-md transition-all"
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-sm font-medium">{cat.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}