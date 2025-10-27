import { Button } from '@/components/ui/button';
import { Frown, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Frown className="w-10" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>No pudimos encontrar la página.</p>
      <Button type="button" variant="secondary" asChild className="mt-5">
        <Link href="/">
          <Home />
          Pagina principal
        </Link>
      </Button>
    </main>
  );
}
