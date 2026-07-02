import Link from "next/link";
import { getAllBreeds, getAllConditions, getAllCities } from "@/lib/data";

export default function HomePage() {
  const breeds = getAllBreeds().slice(0, 8);
  const conditions = getAllConditions().slice(0, 6);
  const cities = getAllCities().slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Real Pet Care Guides, No Fluff</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Breed guides, common health conditions, and buying guides built from
          real, verifiable information -- not auto-generated filler.
        </p>
      </section>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Breed Guides</h2>
          <Link href="/breed" className="text-amber-700 text-sm hover:underline">View all &rarr;</Link>
        </div>
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
      </section>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Health Conditions</h2>
          <Link href="/health-condition" className="text-amber-700 text-sm hover:underline">View all &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {conditions.map((c) => (
            <Link
              key={c.slug}
              href={`/health-condition/${c.slug}`}
              className="border border-gray-200 rounded-lg p-4 hover:border-amber-400 transition"
            >
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-gray-500">{c.species.join(", ")}</div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Pet Care by City</h2>
          <Link href="/pet-care-in" className="text-amber-700 text-sm hover:underline">View all &rarr;</Link>
        </div>
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
      </section>
    </div>
  );
}
