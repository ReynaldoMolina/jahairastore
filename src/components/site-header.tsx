'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { ActionBar } from './actiontools/action-bar';

interface SiteHeader {
  title: string;
  children?: React.ReactNode;
  showActionBar?: boolean;
  hideNewButton?: boolean;
}

export function SiteHeader({
  title,
  children,
  showActionBar = false,
  hideNewButton,
}: SiteHeader) {
  const router = useRouter();

  return (
    <header className="inline-flex font-semibold text-sm h-10 items-center border-b shrink-0 px-3 gap-1">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowLeft className="size-4.5" />
      </Button>
      {title ? title : 'Title'}
      {showActionBar && (
        <ActionBar hideNewButton={hideNewButton}>{children}</ActionBar>
      )}
    </header>
  );
}
