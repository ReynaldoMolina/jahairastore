import React from 'react';

interface PageWrapper {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapper) {
  return (
    <div className="flex flex-col flex-1 p-3 overflow-auto gap-3">
      {children}
    </div>
  );
}
