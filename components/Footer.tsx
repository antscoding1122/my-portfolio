// Server component for the Footer.
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border border-black transition-colors hover:border-green-500 bg-white/50 px-6 py-6 backdrop-blur-sm">
      <p className="text-center text-lg font-semibold text-zinc-900">
        <Link
          href="/"
          className="inline-block transition-all hover:scale-110 hover:font-bold hover:text-green-600 active:scale-95 active:text-green-700"
        >
          The End of the Portfolio!
        </Link>
      </p>
    </footer>
  );
}