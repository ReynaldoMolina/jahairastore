import { cn } from '@/lib/utils';
import React from 'react';

interface PageWrapper {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapper) {
  return (
    <div
      className={cn('flex flex-col p-3 gap-3 overflow-auto flex-1', className)}
    >
      {children}
    </div>
  );
}
