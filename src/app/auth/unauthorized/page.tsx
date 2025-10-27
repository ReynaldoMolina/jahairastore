import { Button } from '@/components/ui/button';
import { ArrowLeft, Frown } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Frown className="w-10" />
      <h2 className="text-xl font-semibold">Lo sentimos</h2>
      <p>Tu usuario no está autorizado.</p>
      <Button type="button" variant="secondary" asChild className="mt-5">
        <Link href="/auth/login">
          <ArrowLeft />
          Regresar
        </Link>
      </Button>
    </main>
  );
}
