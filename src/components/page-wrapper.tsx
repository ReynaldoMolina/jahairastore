import { cn } from '@/lib/utils';
import React from 'react';

interface PageWrapper {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapper) {
  return (
    <div
      className={cn(
        'flex flex-col p-2 md:p-4 gap-2 overflow-auto flex-1',
        className
      )}
    >
      {children}
    </div>
  );
}
