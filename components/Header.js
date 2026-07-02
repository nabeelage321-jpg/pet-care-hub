import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-amber-700">
          🐾 Pet Care Hub
        </Link>
        <nav className="flex gap-5 text-sm text-gray-600">
          <Link href="/breed" className="hover:text-amber-700">Breeds</Link>
          <Link href="/health-condition" className="hover:text-amber-700">Health</Link>
          <Link href="/product" className="hover:text-amber-700">Products</Link>
          <Link href="/pet-care-in" className="hover:text-amber-700">Cities</Link>
        </nav>
      </div>
    </header>
  );
}
