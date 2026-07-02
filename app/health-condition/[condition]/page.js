import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllConditions, getConditionBySlug, getAllBreeds } from "@/lib/data";
import VetDisclaimer from "@/components/VetDisclaimer";

export function generateStaticParams() {
  return getAllConditions().map((c) => ({ condition: c.slug }));
}

export function generateMetadata({ params }) {
  const condition = getConditionBySlug(params.condition);
  if (!condition) return {};
  return {
    title: `${condition.name} in Pets -- Symptoms & General Info`,
    description: condition.summary,
  };
}

export default function ConditionPage({ params }) {
  const condition = getConditionBySlug(params.condition);
  if (!condition) notFound();

  const affectedBreeds = getAllBreeds().filter((b) =>
    condition.commonlyAffected.includes(b.slug)
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-sm text-amber-700 mb-2">
        Affects: {condition.species.join(" & ")}
      </p>
      <h1 className="text-3xl font-bold mb-4">{condition.name}</h1>
      <p className="text-gray-700 leading-relaxed mb-2">{condition.summary}</p>

      <VetDisclaimer />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Symptoms to Watch For</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {condition.symptoms.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">General Information</h2>
        <p className="text-gray-700 leading-relaxed">{condition.generalInfo}</p>
      </section>

      {affectedBreeds.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Commonly Affected Breeds</h2>
          <div className="flex flex-wrap gap-3">
            {affectedBreeds.map((b) => (
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
