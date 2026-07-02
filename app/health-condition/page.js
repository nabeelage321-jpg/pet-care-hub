import Link from "next/link";
import { getAllConditions } from "@/lib/data";

export const metadata = {
  title: "Pet Health Conditions",
  description: "General information on common dog and cat health conditions, symptoms, and affected breeds.",
};

export default function ConditionIndexPage() {
  const conditions = getAllConditions();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Health Conditions</h1>
      <p className="text-gray-600 mb-6">General information only -- always consult a veterinarian for diagnosis.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conditions.map((c) => (
          <Link
            key={c.slug}
            href={`/health-condition/${c.slug}`}
            className="border border-gray-200 rounded-lg p-4 hover:border-amber-400 transition"
          >
            <div className="font-medium">{c.name}</div>
            <div className="text-sm text-gray-500">{c.summary}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
