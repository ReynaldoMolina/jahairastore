import { cn } from '@/lib/utils';
import React from 'react';

interface PageWrapper {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapper) {
  return (
    <div
      className={cn('flex flex-col flex-1 p-3 overflow-auto gap-3', className)}
    >
      {children}
    </div>
  );
}
