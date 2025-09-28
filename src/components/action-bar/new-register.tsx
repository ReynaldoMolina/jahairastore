'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export default function NewRegister() {
  return (
    <Button asChild>
      <Link href="/create">
        <Plus />
        Nuevo
      </Link>
    </Button>
  );
}
