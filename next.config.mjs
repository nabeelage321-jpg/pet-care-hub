/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // static HTML export -- every page pre-rendered at build time
  images: {
    unoptimized: true, // required for static export; breed images come from external API URLs
  },
  trailingSlash: true,
};

export default nextConfig;
