'use client';

import React from 'react';
import { NewButton } from './new-register';
import { SearchInput } from './search-input';

interface ActionBar {
  children: React.ReactNode;
  hideNewButton?: boolean;
}

export function ActionBar({ children, hideNewButton = false }: ActionBar) {
  return (
    <div className="flex gap-1 items-center ml-auto">
      {/* <SearchButton /> */}
      <SearchInput className="max-w-30 sm:max-w-40" />
      {children}
      {!hideNewButton && <NewButton />}
    </div>
  );
}
