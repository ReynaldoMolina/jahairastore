'use client';

import React from 'react';
import { NewButton } from './new-register';
import { SearchButton, SearchInput } from './search-input';
import { useIsMobile } from '@/hooks/use-mobile';

interface ActionBar {
  children: React.ReactNode;
  hideNewButton?: boolean;
}

export function ActionBar({ children, hideNewButton = false }: ActionBar) {
  const isMobile = useIsMobile();

  return (
    <div className="flex gap-1 items-center ml-auto">
      {isMobile ? <SearchButton /> : <SearchInput />}
      {children}
      {!hideNewButton && <NewButton />}
    </div>
  );
}
