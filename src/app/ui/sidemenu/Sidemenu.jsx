'use client';

import { menuOptions } from '@/app/lib/menuOptions';
import { MenuItem } from './MenuItem';
import LogoMinimal from '@/app/ui/icons/logominimal.svg';

export default function SideMenu() {
  return (
    <nav className="flex items-center md:flex-col overflow-y-scroll gap-1 p-1 md:p-2 sticky bottom-0 md:top-0 bg-white dark:bg-neutral-800 z-20 w-screen md:min-w-25 md:w-25 md:max-h-screen order-2 md:order-0 overscroll-contain border-t md:border-t-0 md:border-r border-neutral-300 dark:border-neutral-600">
      <MenuLogo />
      {menuOptions.map((option) => (
        <div
          key={option.id}
          className="flex md:flex-col items-center gap-1 w-full"
        >
          <MenuItem option={option} />
          {option.divider && (
            <div className="h-10 md:h-0 md:w-8/10 border-r-1 md:border-b-1 dark:border-neutral-600 border-neutral-300"></div>
          )}
        </div>
      ))}
    </nav>
  );
}

function MenuLogo() {
  return (
    <div className="hidden md:flex min-w-17 md:min-h-17 justify-center items-center">
      <LogoMinimal className="size-12 p-2" />
    </div>
  );
}
