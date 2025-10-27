'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getClientSession } from '@/authorization/get-client-session';
import Image from 'next/image';

interface SiteHeader {
  title: string;
  dontShowBackButton?: boolean;
}

export function SiteHeader({ title, dontShowBackButton = false }: SiteHeader) {
  const router = useRouter();
  const { user } = getClientSession();

  return (
    <header className="inline-flex font-bold text-md h-12 items-center border-b shrink-0 px-3 gap-2">
      {!dontShowBackButton && (
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-5" />
        </Button>
      )}
      {title ? title : 'Title'}
      <Avatar className="ml-auto">
        <AvatarImage src={user?.image} alt="Avatar" />
        <AvatarFallback className="text-xs">JS</AvatarFallback>
      </Avatar>
    </header>
  );
}
