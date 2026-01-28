import Link from 'next/link';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';

interface EditDetailButton {
  href: string;
}

export function EditDetailButton({ href }: EditDetailButton) {
  return (
    <Button variant="outline" size="icon-sm" asChild>
      <Link href={href} scroll={false}>
        <Pencil />
      </Link>
    </Button>
  );
}
