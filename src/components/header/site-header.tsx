'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { HeaderActions } from './header-actions';
import { SidebarTrigger } from '../ui/sidebar';

interface SiteHeader {
  title: string;
  children?: React.ReactNode;
  showHeaderActions?: boolean;
  hideNewButton?: boolean;
  hideBackButton?: boolean;
}

export function SiteHeader({
  title,
  children,
  showHeaderActions = false,
  hideNewButton,
  hideBackButton,
}: SiteHeader) {
  const router = useRouter();

  return (
    <header className="flex sticky top-0 h-12 items-center border-b px-2 md:px-3 gap-1 z-20 bg-background">
      {!hideBackButton ? (
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4.5" />
        </Button>
      ) : (
        <SidebarTrigger className="size-9" />
      )}
      <span className="font-semibold text-sm ml-1">{title}</span>
      {showHeaderActions && (
        <HeaderActions hideNewButton={hideNewButton}>{children}</HeaderActions>
      )}
    </header>
  );
}
