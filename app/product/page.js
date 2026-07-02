import Link from "next/link";
import { getAllProductCategories } from "@/lib/data";

export const metadata = {
  title: "Pet Product Buying Guides",
  description: "What to look for when choosing pet food, gear, and health products -- no fabricated reviews.",
};

export default function ProductIndexPage() {
  const categories = getAllProductCategories();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Buying Guides</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.slug}`}
            className="border border-gray-200 rounded-lg p-4 hover:border-amber-400 transition"
          >
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-gray-500 capitalize">{p.species === "both" ? "Dogs & Cats" : p.species}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
