import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '../ui/sidebar';
import { MenuOption } from './menu-options';
import React from 'react';

interface MenuItem {
  children?: React.ReactNode;
  option: MenuOption;
}

export function MenuItem({ option, children }: MenuItem) {
  const { setOpenMobile } = useSidebar();

  const pathname = usePathname();
  const optionPathname = option.url.split('?')[0];
  const isActive =
    option.url === '/' ? pathname === '/' : pathname.startsWith(optionPathname);

  return (
    <SidebarMenuItem key={option.name}>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className="data-[active=true]:bg-brand data-[active=true]:text-black"
        onClick={() => setOpenMobile(false)}
      >
        <Link href={option.url}>
          <option.icon className="size-4 md:size-3.5" />
          {option.name}
        </Link>
      </SidebarMenuButton>
      {children}
    </SidebarMenuItem>
  );
}

export function MenuSubItem({ option }: MenuItem) {
  const { setOpenMobile } = useSidebar();

  const pathname = usePathname();
  const optionPathname = option.url.split('?')[0];
  const isActive =
    option.url === '/' ? pathname === '/' : pathname.startsWith(optionPathname);

  return (
    <SidebarMenuSubItem key={option.name}>
      <SidebarMenuSubButton
        asChild
        isActive={isActive}
        className="data-[active=true]:bg-brand data-[active=true]:text-black"
        onClick={() => setOpenMobile(false)}
      >
        <Link href={option.url}>
          {/* <option.icon className="size-4 md:size-3.5" /> */}
          {option.name}
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
