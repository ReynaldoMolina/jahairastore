import SideMenu from '@/components/sidemenu/side-menu';
import '@/app/globals.css';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex relative flex-col md:flex-row bg-background min-h-screen">
      <SideMenu />
      <div className="flex flex-col flex-1">{children}</div>
    </main>
  );
}
