'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export function NewButton() {
  const pathname = usePathname();

  return (
    <Button asChild>
      <Link href={`${pathname}/crear`}>
        <Plus />
        <span className="hidden sm:block">Nuevo</span>
      </Link>
    </Button>
  );
}
