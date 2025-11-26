'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { MenuItem, MenuItemDesktop } from './menu-item';
import { menuOptions } from './menu-options';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '../ui/sidebar';

export function AppSideBar() {
  const isMobile = useIsMobile();

  return isMobile ? (
    <nav className="flex overflow-auto gap-1 p-1 bg-sidebar w-full shrink-0 order-2 border-t border-sidebar-border md:hidden">
      {menuOptions.map((option) => (
        <MenuItem key={option.name} option={option} />
      ))}
    </nav>
  ) : (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuOptions.map((option) => (
                <MenuItemDesktop key={option.name} option={option} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
