// ============================================================================
// fetch-data.js
//
// Pulls the FULL breed dataset from TheDogAPI / TheCatAPI and overwrites
// data/dog-breeds.json and data/cat-breeds.json with real, complete data.
//
// This script must be run on a machine with normal internet access --
// it will NOT run inside a network-restricted build sandbox.
//
// Usage:
//   node scripts/fetch-data.js
//
// Optional: get a free API key from thedogapi.com / thecatapi.com for
// higher rate limits, then set DOG_API_KEY / CAT_API_KEY env vars.
// The public "no key" endpoint works fine at this volume.
// ============================================================================

import fs from "fs/promises";
import path from "path";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function fetchDogBreeds() {
  console.log("Fetching dog breeds from TheDogAPI...");
  const res = await fetch("https://api.thedogapi.com/v1/breeds", {
    headers: process.env.DOG_API_KEY ? { "x-api-key": process.env.DOG_API_KEY } : {},
  });
  if (!res.ok) throw new Error(`TheDogAPI request failed: ${res.status}`);
  const breeds = await res.json();

  return breeds
    .filter((b) => b.name && b.temperament) // skip incomplete entries
    .map((b) => ({
      slug: slugify(b.name),
      name: b.name,
      group: b.breed_group || "Unspecified",
      temperament: b.temperament.split(",").map((t) => t.trim()),
      size: b.weight?.imperial ? `${b.weight.imperial} lbs` : "Unspecified",
      weightRange: b.weight?.imperial ? `${b.weight.imperial} lbs` : "Unspecified",
      heightRange: b.height?.imperial ? `${b.height.imperial} in` : "Unspecified",
      lifeSpan: b.life_span || "Unspecified",
      image: b.image?.url || null,
      // NOTE: commonHealthConditions and overview are NOT provided by this API.
      // Keep these hand-curated (see data/conditions.json) rather than
      // auto-generating claims the API doesn't actually support.
      commonHealthConditions: [],
      overview: `${b.name} is a ${b.breed_group || ""} breed.`.trim(),
    }));
}

async function fetchCatBreeds() {
  console.log("Fetching cat breeds from TheCatAPI...");
  const res = await fetch("https://api.thecatapi.com/v1/breeds", {
    headers: process.env.CAT_API_KEY ? { "x-api-key": process.env.CAT_API_KEY } : {},
  });
  if (!res.ok) throw new Error(`TheCatAPI request failed: ${res.status}`);
  const breeds = await res.json();

  return breeds.map((b) => ({
    slug: slugify(b.name),
    name: b.name,
    temperament: (b.temperament || "").split(",").map((t) => t.trim()).filter(Boolean),
    size: "Unspecified",
    weightRange: b.weight?.imperial ? `${b.weight.imperial} lbs` : "Unspecified",
    lifeSpan: b.life_span ? `${b.life_span} years` : "Unspecified",
    image: b.image?.url || null,
    commonHealthConditions: [],
    overview: b.description || `${b.name} is a cat breed.`,
  }));
}

// Nominatim is rate-limited to 1 req/sec -- this fetches details for a
// curated city list (data/cities.json) rather than trying to enumerate
// every US city, which the API isn't meant for at that volume.
async function enrichCities() {
  console.log("Enriching city data via Nominatim (respecting 1 req/sec)...");
  const citiesPath = path.join(process.cwd(), "data", "cities.json");
  const cities = JSON.parse(await fs.readFile(citiesPath, "utf-8"));

  const enriched = [];
  for (const city of cities) {
    const query = encodeURIComponent(`${city.name}, ${city.state}, USA`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
      { headers: { "User-Agent": "PetCareHub/1.0 (contact: you@example.com)" } }
    );
    if (res.ok) {
      const results = await res.json();
      if (results[0]) {
        enriched.push({ ...city, lat: results[0].lat, lon: results[0].lon });
      } else {
        enriched.push(city);
      }
    } else {
      enriched.push(city);
    }
    await sleep(1100); // stay under 1 req/sec
  }
  return enriched;
}

async function main() {
  const dataDir = path.join(process.cwd(), "data");

  try {
    const dogBreeds = await fetchDogBreeds();
    await fs.writeFile(
      path.join(dataDir, "dog-breeds.json"),
      JSON.stringify(dogBreeds, null, 2)
    );
    console.log(`Wrote ${dogBreeds.length} dog breeds.`);
  } catch (err) {
    console.error("Dog breed fetch failed, keeping existing seed data:", err.message);
  }

  try {
    const catBreeds = await fetchCatBreeds();
    await fs.writeFile(
      path.join(dataDir, "cat-breeds.json"),
      JSON.stringify(catBreeds, null, 2)
    );
    console.log(`Wrote ${catBreeds.length} cat breeds.`);
  } catch (err) {
    console.error("Cat breed fetch failed, keeping existing seed data:", err.message);
  }

  try {
    const cities = await enrichCities();
    await fs.writeFile(
      path.join(dataDir, "cities.json"),
      JSON.stringify(cities, null, 2)
    );
    console.log(`Enriched ${cities.length} cities.`);
  } catch (err) {
    console.error("City enrichment failed, keeping existing seed data:", err.message);
  }

  console.log("\nDone. IMPORTANT: after running this, manually re-check");
  console.log("commonHealthConditions / overview fields -- the raw API data");
  console.log("doesn't include these, so keep them hand-curated for accuracy.");
}

main();
