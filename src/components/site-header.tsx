'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { ActionBar } from './actiontools/action-bar';
import { SidebarTrigger } from './ui/sidebar';
import { Separator } from '@radix-ui/react-separator';

interface SiteHeader {
  title: string;
  children?: React.ReactNode;
  showActionBar?: boolean;
  showSidebarTrigger?: boolean;
  hideNewButton?: boolean;
  hideBackButton?: boolean;
}

export function SiteHeader({
  title,
  children,
  showActionBar = false,
  showSidebarTrigger = false,
  hideNewButton,
  hideBackButton,
}: SiteHeader) {
  const router = useRouter();

  return (
    <header className="inline-flex font-semibold text-xs h-11 items-center border-b shrink-0 px-3 gap-1">
      {showSidebarTrigger && <SidebarTrigger />}
      <Separator />
      {!hideBackButton && (
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeft className="size-4.5" />
        </Button>
      )}
      {title ? title : 'Title'}
      {showActionBar && (
        <ActionBar hideNewButton={hideNewButton}>{children}</ActionBar>
      )}
    </header>
  );
}
