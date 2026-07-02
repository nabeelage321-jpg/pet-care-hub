import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} -- Breed Guides, Health Info & Buying Guides`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Real, curated guides on dog and cat breeds, common health conditions, and pet product buying guides.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    title: `${SITE_NAME} -- Breed Guides, Health Info & Buying Guides`,
    description:
      "Real, curated guides on dog and cat breeds, common health conditions, and pet product buying guides.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} -- Breed Guides, Health Info & Buying Guides`,
    description:
      "Real, curated guides on dog and cat breeds, common health conditions, and pet product buying guides.",
  },
};
verification: {
  google: "nrQfXDbfR7qFDIjiFgoF47jMFAa8myV4cVgzyKtlU64",
},
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
