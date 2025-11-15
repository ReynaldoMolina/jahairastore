import Link from 'next/link';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';

interface EditDetailButton {
  href: string;
}

export function EditDetailButton({ href }: EditDetailButton) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      className="size-7 md:size-6"
      asChild
    >
      <Link href={href}>
        <Pencil className="size-3.5" />
      </Link>
    </Button>
  );
}
