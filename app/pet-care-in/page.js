import Link from "next/link";
import { getAllCities } from "@/lib/data";

export const metadata = {
  title: "Pet Care by City",
  description: "Climate and local considerations for pet care across major US cities.",
};

export default function CityIndexPage() {
  const cities = getAllCities();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Pet Care by City</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cities.map((c) => (
          <Link
            key={c.slug}
            href={`/pet-care-in/${c.slug}`}
            className="border border-gray-200 rounded-lg p-4 hover:border-amber-400 transition"
          >
            <div className="font-medium">{c.name}, {c.state}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
