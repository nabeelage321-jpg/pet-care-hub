import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBreeds, getBreedBySlug, getAllConditions } from "@/lib/data";
import VetDisclaimer from "@/components/VetDisclaimer";

export function generateStaticParams() {
  return getAllBreeds().map((b) => ({ breed: b.slug }));
}

export function generateMetadata({ params }) {
  const breed = getBreedBySlug(params.breed);
  if (!breed) return {};
  return {
    title: `${breed.name} Guide -- Temperament, Size & Health`,
    description: `${breed.name} breed guide: temperament, size, life span, and common health considerations.`,
  };
}

export default function BreedPage({ params }) {
  const breed = getBreedBySlug(params.breed);
  if (!breed) notFound();

  const allConditions = getAllConditions();
  const relatedConditions = allConditions.filter((c) =>
    breed.commonHealthConditions.includes(c.slug)
  );

  const related = getAllBreeds()
    .filter((b) => b.species === breed.species && b.slug !== breed.slug)
    .slice(0, 4);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-sm text-amber-700 capitalize mb-2">{breed.species} breed guide</p>
      <h1 className="text-3xl font-bold mb-4">{breed.name}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {breed.temperament.map((t) => (
          <span key={t} className="bg-amber-50 text-amber-800 text-xs px-3 py-1 rounded-full">
            {t}
          </span>
        ))}
      </div>

      <p className="text-gray-700 leading-relaxed mb-8">{breed.overview}</p>

      <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
        {breed.weightRange && (
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="text-gray-500">Weight</div>
            <div className="font-medium">{breed.weightRange}</div>
          </div>
        )}
        {breed.heightRange && (
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="text-gray-500">Height</div>
            <div className="font-medium">{breed.heightRange}</div>
          </div>
        )}
        {breed.lifeSpan && (
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="text-gray-500">Life Span</div>
            <div className="font-medium">{breed.lifeSpan}</div>
          </div>
        )}
        {breed.group && (
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="text-gray-500">Group</div>
            <div className="font-medium">{breed.group}</div>
          </div>
        )}
      </div>

      {relatedConditions.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Common Health Considerations</h2>
          <VetDisclaimer />
          <ul className="space-y-2">
            {relatedConditions.map((c) => (
              <li key={c.slug}>
                <Link href={`/health-condition/${c.slug}`} className="text-amber-700 hover:underline">
                  {c.name}
                </Link>
                <span className="text-gray-500 text-sm"> -- {c.summary}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Related Breeds</h2>
          <div className="flex flex-wrap gap-3">
            {related.map((b) => (
              <Link
                key={b.slug}
                href={`/breed/${b.slug}`}
                className="border border-gray-200 rounded-lg px-4 py-2 hover:border-amber-400 transition"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
