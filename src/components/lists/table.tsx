import { Table } from '../ui/table';
import React from 'react';
import { cn } from '@/lib/utils';

interface TableContainer {
  children: React.ReactNode;
  className?: string;
}

export function TableContainer({ children, className }: TableContainer) {
  return (
    <section
      className={cn(
        'flex flex-col gap-3 md:gap-0 rounded-lg flex-1 overflow-auto',
        className
      )}
    >
      <Table>{children}</Table>
    </section>
  );
}
