export const SITE_NAME = "Pet Care Hub";
export const SITE_URL = "https://pet-care-hub-chi.vercel.app"; // update if you add a custom domain

export function buildOpenGraph({ title, description, path = "" }) {
  return {
    title,
    description,
    url: `${SITE_URL}${path}`,
    siteName: SITE_NAME,
    type: "article",
  };
}

export function articleJsonLd({ headline, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

export function productJsonLd({ name, description, url, category }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    category,
  };
}
