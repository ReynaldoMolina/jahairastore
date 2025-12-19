import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';

interface EditDetailButton {
  href: string;
}

export function EditDetailButton({ href }: EditDetailButton) {
  return (
    <DropdownMenuItem asChild>
      <Link href={href}>Editar</Link>
    </DropdownMenuItem>
  );
}
