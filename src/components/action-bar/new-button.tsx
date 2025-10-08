'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

export default function NewRegister() {
  const pathname = usePathname();
  return (
    <Button asChild>
      <Link href={`${pathname}/nuevo`}>
        <Plus />
        <span className="hidden sm:block">Nuevo</span>
      </Link>
    </Button>
  );
}
