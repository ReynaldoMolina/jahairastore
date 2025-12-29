'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { ActionBar } from './actiontools/action-bar';
import { SidebarTrigger } from './ui/sidebar';

interface SiteHeader {
  title: string;
  children?: React.ReactNode;
  showActionBar?: boolean;
  hideNewButton?: boolean;
  hideBackButton?: boolean;
}

export function SiteHeader({
  title,
  children,
  showActionBar = false,
  hideNewButton,
  hideBackButton,
}: SiteHeader) {
  const router = useRouter();

  return (
    <header className="flex sticky top-0 h-12 items-center border-b px-2 md:px-4 gap-1 z-20 bg-background">
      {!hideBackButton ? (
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4.5" />
        </Button>
      ) : (
        <SidebarTrigger className="size-9" />
      )}
      <span className="font-semibold text-sm ml-1">{title}</span>
      {showActionBar && (
        <ActionBar hideNewButton={hideNewButton}>{children}</ActionBar>
      )}
    </header>
  );
}
