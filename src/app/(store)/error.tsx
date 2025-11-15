'use client';

import { Button } from '@/components/ui/button';
import { CircleAlert, RotateCcw } from 'lucide-react';

export default function Error({ error, reset }) {
  return (
    <main className="flex gap-6 flex-col items-center justify-center flex-1 p-3">
      <div className="flex gap-2 items-center p-2 px-3 bg-red-100 dark:bg-red-900 rounded-full text-red-600 dark:text-white text-sm">
        <CircleAlert className="size-5" />
        Error
      </div>
      <p className="text-xs text-destructive text-center">{error.message}</p>
      <Button variant="secondary" onClick={() => reset()}>
        <RotateCcw />
        Reintentar
      </Button>
    </main>
  );
}
