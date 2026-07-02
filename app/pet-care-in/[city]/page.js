import { notFound } from "next/navigation";
import { getAllCities, getCityBySlug } from "@/lib/data";

export function generateStaticParams() {
  return getAllCities().map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }) {
  const city = getCityBySlug(params.city);
  if (!city) return {};
  return {
    title: `Pet Care in ${city.name}, ${city.state}`,
    description: `Climate and local pet care considerations for ${city.name}, ${city.state}.`,
  };
}

export default function CityPage({ params }) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Pet Care in {city.name}, {city.state}</h1>
      <p className="text-gray-500 mb-6">{city.climate}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Local Consideration</h2>
        <p className="text-gray-700 leading-relaxed">{city.note}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">General Climate-Based Tips</h2>
        <p className="text-gray-700 leading-relaxed">
          Local climate affects everything from exercise timing to coat and
          paw care. Check with a local vet or groomer for specifics tailored
          to your pet&apos;s breed and health history in {city.name}.
        </p>
      </section>
    </div>
  );
}
