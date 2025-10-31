'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export function NewButton() {
  const pathname = usePathname();

  return (
    <Button size="sm" asChild>
      <Link href={`${pathname}/create`}>
        <Plus />
        <span className="hidden sm:block">Nuevo</span>
      </Link>
    </Button>
  );
}
