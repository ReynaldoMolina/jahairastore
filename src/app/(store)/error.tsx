'use client';

import { Button } from '@/components/ui/button';
import { CircleX, RotateCcw } from 'lucide-react';

export default function Error({ error, reset }) {
  return (
    <main className="flex gap-5 grow flex-col items-center justify-center">
      <div className="flex gap-2 items-center p-2 px-3 bg-red-100 dark:bg-red-900 rounded-full">
        <CircleX className="size-5 text-red-600 dark:text-white" />
        <span className="text-center text-sm text-red-600 dark:text-white font-semibold text-wrap">
          Error
        </span>
      </div>
      <p className="text-center text-sm text-red-600 dark:text-red-400">
        {error.message}
      </p>
      <Button variant="outline" onClick={() => reset()}>
        <RotateCcw />
        Reintentar
      </Button>
    </main>
  );
}
