'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function Header({ title }: { title: string }) {
  const router = useRouter();

  return (
    <header className="inline-flex gap-2 items-center px-3 min-h-11 border-b">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowLeft className="size-5" />
      </Button>
      <span className="font-semibold text-sm">{title}</span>
    </header>
  );
}
