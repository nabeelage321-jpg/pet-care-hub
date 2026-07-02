import { getAllBreeds, getAllConditions, getAllCities, getAllProductCategories } from "@/lib/data";

const BASE_URL = "https://pet-care-hub-chi.vercel.app"; // TODO: replace with your real domain after deploy

export default function sitemap() {
  const staticPages = ["", "/breed", "/health-condition", "/pet-care-in", "/product"].map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: new Date(),
  }));

  const breedPages = getAllBreeds().map((b) => ({
    url: `${BASE_URL}/breed/${b.slug}`,
    lastModified: new Date(),
  }));

  const conditionPages = getAllConditions().map((c) => ({
    url: `${BASE_URL}/health-condition/${c.slug}`,
    lastModified: new Date(),
  }));

  const cityPages = getAllCities().map((c) => ({
    url: `${BASE_URL}/pet-care-in/${c.slug}`,
    lastModified: new Date(),
  }));

  const productPages = getAllProductCategories().map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...breedPages, ...conditionPages, ...cityPages, ...productPages];
}
