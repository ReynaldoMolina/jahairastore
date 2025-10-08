'use client';

import NewRegister from './new-button';
import React from 'react';
import SearchInput from './search-input';

interface SearchInputProps {
  allowNew?: boolean;
  children?: React.ReactNode;
}

export function ActionBar({ allowNew = true, children }: SearchInputProps) {
  return (
    <div className="inline-flex gap-2">
      <SearchInput />
      <div className="inline-flex gap-2 ml-auto">
        {children}
        {allowNew && <NewRegister />}
      </div>
    </div>
  );
}
