import dogBreeds from "@/data/dog-breeds.json";
import catBreeds from "@/data/cat-breeds.json";
import conditions from "@/data/conditions.json";
import cities from "@/data/cities.json";
import productCategories from "@/data/product-categories.json";

export function getAllBreeds() {
  return [
    ...dogBreeds.map((b) => ({ ...b, species: "dog" })),
    ...catBreeds.map((b) => ({ ...b, species: "cat" })),
  ];
}

export function getBreedBySlug(slug) {
  return getAllBreeds().find((b) => b.slug === slug) || null;
}

export function getAllConditions() {
  return conditions;
}

export function getConditionBySlug(slug) {
  return conditions.find((c) => c.slug === slug) || null;
}

export function getAllCities() {
  return cities;
}

export function getCityBySlug(slug) {
  return cities.find((c) => c.slug === slug) || null;
}

export function getAllProductCategories() {
  return productCategories;
}

export function getProductCategoryBySlug(slug) {
  return productCategories.find((p) => p.slug === slug) || null;
}
