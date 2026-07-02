// ============================================================================
// AFFILIATE CONFIG -- edit this file only, after you've checked Search
// Console impressions/clicks (recommended: wait ~4 weeks post-deploy).
// Nothing here is live until you fill in a tag/ID below.
// ============================================================================

export const affiliates = {
  amazon: {
    enabled: false, // flip to true once you have an Associates tag
    tag: "", // e.g. "petcarehub-20"
    baseUrl: "https://www.amazon.com/s",
  },
  chewy: {
    enabled: false,
    affiliateId: "", // fill in once approved
  },
  adsense: {
    enabled: false,
    publisherId: "", // e.g. "ca-pub-XXXXXXXXXXXXXXXX"
  },
  insurance: {
    enabled: false,
    provider: "", // e.g. "embrace" | "trupanion"
    link: "",
  },
};

// Required FTC disclosure -- rendered automatically wherever an affiliate
// link is shown. Do not remove.
export const AFFILIATE_DISCLOSURE =
  "This page may contain affiliate links. If you make a purchase through them, we may earn a commission at no extra cost to you.";

// Helper: build an Amazon search link for a query, only if enabled.
export function amazonSearchLink(query) {
  if (!affiliates.amazon.enabled || !affiliates.amazon.tag) return null;
  const params = new URLSearchParams({
    k: query,
    tag: affiliates.amazon.tag,
  });
  return `${affiliates.amazon.baseUrl}?${params.toString()}`;
}
