import Link from "next/link";
import { getAllBreeds } from "@/lib/data";

export const metadata = {
  title: "Dog & Cat Breed Guides",
  description: "Browse breed guides covering temperament, size, and common health considerations.",
};

export default function BreedIndexPage() {
  const breeds = getAllBreeds();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Breed Guides</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {breeds.map((b) => (
          <Link
            key={b.slug}
            href={`/breed/${b.slug}`}
            className="border border-gray-200 rounded-lg p-4 hover:border-amber-400 transition"
          >
            <div className="font-medium">{b.name}</div>
            <div className="text-xs text-gray-500 capitalize">{b.species}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
