import { notFound } from "next/navigation";
import { getAllProductCategories, getProductCategoryBySlug } from "@/lib/data";
import { affiliates, AFFILIATE_DISCLOSURE, amazonSearchLink } from "@/lib/affiliates";

export function generateStaticParams() {
  return getAllProductCategories().map((p) => ({ category: p.slug }));
}

export function generateMetadata({ params }) {
  const category = getProductCategoryBySlug(params.category);
  if (!category) return {};
  return {
    title: `${category.name} Buying Guide`,
    description: `What to look for when choosing ${category.name.toLowerCase()} -- general buying guide, no fabricated reviews.`,
  };
}

export default function ProductCategoryPage({ params }) {
  const category = getProductCategoryBySlug(params.category);
  if (!category) notFound();

  const amazonLink = amazonSearchLink(category.name);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{category.name} Buying Guide</h1>
      <p className="text-gray-700 leading-relaxed mb-8">{category.overview}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">What to Look For</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {category.whatToLookFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {affiliates.amazon.enabled && amazonLink && (
        <div className="border border-gray-200 rounded-lg p-4">
          <a
            href={amazonLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
          >
            Browse {category.name} options
          </a>
          <p className="text-xs text-gray-500 mt-2">{AFFILIATE_DISCLOSURE}</p>
        </div>
      )}
    </div>
  );
}
