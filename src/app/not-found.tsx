import { Frown } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Frown className="w-10" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>No pudimos encontrar la página</p>
      <Link
        href="/"
        className="mt-4 rounded-xl bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700"
      >
        Pagina principal
      </Link>
    </main>
  );
}
