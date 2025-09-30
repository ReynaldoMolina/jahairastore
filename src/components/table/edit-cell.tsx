import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export function EditCell({ href }: { href: string }) {
  return (
    <div className="w-full inline-flex justify-center">
      <Button variant="outline" size="sm" asChild>
        <Link href={href}>
          <Pencil />
        </Link>
      </Button>
    </div>
  );
}
