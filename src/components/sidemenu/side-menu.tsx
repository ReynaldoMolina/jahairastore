'use client';

import { MenuItem } from './menu-item';
import { menuOptions } from './menu-options';

export default function SideMenu() {
  return (
    <nav className="flex md:flex-col overflow-y-auto gap-1 p-1 md:p-2 bg-sidebar w-full shrink-0 md:w-40 order-2 md:order-0 overscroll-contain border-t md:border-t-0 md:border-r border-sidebar-border min-h-15">
      <span className="hidden md:block text-xs text-muted-foreground py-2">
        Menú
      </span>
      {menuOptions.map((option) => (
        <MenuItem key={option.name} option={option} />
      ))}
    </nav>
  );
}
