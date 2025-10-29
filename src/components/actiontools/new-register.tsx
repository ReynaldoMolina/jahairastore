'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export default function NewRegister({ allowNew = true }) {
  const pathname = usePathname();
  let href = `${pathname}/create`;

  if (!allowNew) return null;

  return (
    <Button asChild disabled={!allowNew}>
      <Link href={href}>
        <Plus />
        Nuevo
      </Link>
    </Button>
  );
}
