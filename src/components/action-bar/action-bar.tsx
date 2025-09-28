'use client';

import NewRegister from './new-register';
import React from 'react';
import SearchInput from './search-input';

interface SearchInputProps {
  allowNew?: boolean;
  children?: React.ReactNode;
}

export default function ActionBar({
  allowNew = true,
  children,
}: SearchInputProps) {
  return (
    <div className="inline-flex gap-2">
      <SearchInput />
      <div className="inline-flex ml-auto gap-1">
        {children}
        {allowNew && <NewRegister />}
      </div>
    </div>
  );
}
