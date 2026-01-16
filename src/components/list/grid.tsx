import React from 'react';

interface GridProps {
  children: React.ReactNode;
}
export function Grid({ children }: GridProps) {
  return (
    <div className="grid gap-3 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
