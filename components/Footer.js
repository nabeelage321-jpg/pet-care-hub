export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-gray-500 space-y-2">
        <p>
          Pet Care Hub provides general information only and is not a
          substitute for professional veterinary advice. Always consult a
          licensed veterinarian about your pet&apos;s specific health needs.
        </p>
        <p>
          This site may contain affiliate links. If you make a purchase
          through them, we may earn a commission at no extra cost to you.
        </p>
        <p>&copy; {new Date().getFullYear()} Pet Care Hub.</p>
      </div>
    </footer>
  );
}
