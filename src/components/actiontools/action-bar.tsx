'use client';

import React from 'react';
import { NewButton } from './new-register';
import { SearchButton } from './search-input';

interface ActionBar {
  children: React.ReactNode;
  hideNewButton?: boolean;
}

export function ActionBar({ children, hideNewButton = false }: ActionBar) {
  return (
    <div className="flex gap-1 items-center ml-auto">
      {children}
      <SearchButton />
      {!hideNewButton && <NewButton />}
    </div>
  );
}
