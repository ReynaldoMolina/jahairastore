'use client';

import React from 'react';
import { NewButton } from './new-register';

interface HeaderActions {
  children: React.ReactNode;
  hideNewButton?: boolean;
}

export function HeaderActions({
  children,
  hideNewButton = false,
}: HeaderActions) {
  return (
    <div className="flex gap-1 items-center ml-auto">
      {children}
      {!hideNewButton && <NewButton />}
    </div>
  );
}
