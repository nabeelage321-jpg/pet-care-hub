export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://pet-care-hub-chi.vercel.app/sitemap.xml", // TODO: replace with your real domain
  };
}
