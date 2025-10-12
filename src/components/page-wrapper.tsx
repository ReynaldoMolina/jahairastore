import React from 'react';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 p-3 overflow-y-auto">{children}</div>
  );
}
