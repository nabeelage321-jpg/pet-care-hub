import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "Pet Care Hub -- Breed Guides, Health Info & Buying Guides",
    template: "%s | Pet Care Hub",
  },
  description:
    "Real, curated guides on dog and cat breeds, common health conditions, and pet product buying guides.",
};

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
