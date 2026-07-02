# Pet Care Hub

A static Next.js site with real, curated content: dog & cat breed guides,
health condition pages, city-based pet care pages, and product buying
guides (no fabricated reviews). 84 pages at launch, all statically
pre-rendered for fast loading and clean crawlability.

## Deploy today (GitHub -> Vercel)

1. Create a new GitHub repo and push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/pet-care-hub.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click
   "Add New Project," select this repo, and click Deploy. No config
   needed -- Vercel auto-detects Next.js.
3. Once deployed, replace `https://example.com` in `app/sitemap.js` and
   `app/robots.js` with your real Vercel/custom domain, commit, and push
   (Vercel redeploys automatically).
4. Go to [Google Search Console](https://search.google.com/search-console),
   add your domain, and submit `https://yourdomain.com/sitemap.xml`.

## The plan you described: wait, check, then monetize

This is the right order. Here's the checklist for after ~4 weeks:

1. Open Search Console -> Performance tab. Look at:
   - **Impressions** -- are pages actually being shown in search results?
   - **Clicks** -- is anyone clicking through?
   - **Which pages** are getting impressions (breed pages? condition pages?
     city pages?) -- this tells you where to focus content next, before
     you focus on monetization.
2. If a page category is getting real traffic, open `lib/affiliates.js`
   and:
   - Set `amazon.enabled: true` and add your Associates `tag` once
     approved ([affiliate-program.amazon.com](https://affiliate-program.amazon.com))
   - Set `chewy.enabled: true` and add your ID once approved
   - Apply for Google AdSense once you have real traffic -- new sites
     with zero traffic are routinely rejected
3. Affiliate links only render when `enabled: true` in that one file --
   no other code changes needed. Every affiliate link automatically shows
   the FTC-required disclosure text.

## Expand the dataset

The site ships with a small, hand-verified seed dataset (20 dog breeds,
10 cat breeds, 15 conditions, 20 cities, 8 product categories) so it
builds and deploys today. To pull the full live breed dataset from
TheDogAPI/TheCatAPI:

```bash
npm run fetch-data
```

Run this on your own machine (not a sandboxed environment) since it
needs open internet access. It will not overwrite `commonHealthConditions`
or hand-written overview text -- keep those curated for accuracy rather
than auto-generating claims the APIs don't actually support.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # outputs static site to /out
```

## Structure

```
app/                  Pages (App Router, static export)
  breed/[breed]/       Breed guide pages
  health-condition/[condition]/  Health info pages (with vet disclaimer)
  pet-care-in/[city]/  City-based pet care pages
  product/[category]/  Buying guides (no fabricated reviews)
data/                 Seed JSON data (hand-curated, real facts)
lib/
  data.js              Data loading helpers
  affiliates.js         <-- the one file to edit for monetization
scripts/fetch-data.js  Real API fetch script (run locally, not in CI sandbox)
```
