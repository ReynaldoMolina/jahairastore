'use client';

import { MenuItem } from './menu-item';
import { menuOptions } from './menu-options';

export default function SideMenu() {
  return (
    <nav className="flex md:flex-col overflow-y-scroll gap-1 p-1 bg-sidebar w-full md:min-w-25 md:w-25 order-2 md:order-0 overscroll-contain border-t md:border-t-0 md:border-r border-sidebar-border min-h-16">
      {menuOptions.map((option) => (
        <MenuItem key={option.id} option={option} />
      ))}
    </nav>
  );
}
