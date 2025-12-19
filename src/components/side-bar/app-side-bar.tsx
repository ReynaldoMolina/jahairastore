'use client';

import { MenuItem } from './menu-item';
import { menuOptions } from './menu-options';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar';
import Link from 'next/link';
import Logo from '@/components/icons/logominimal.svg';
import { NavUser } from './nav-user';
import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import { BusinessInfoType } from '@/types/types';

interface AppSideBarProps {
  businessInfo: BusinessInfoType;
}

export function AppSideBar({ businessInfo }: AppSideBarProps) {
  const [session, setSession] = useState<any>(null);
  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setSession(data);
    });
  }, []);

  const user = session?.user ?? {
    name: 'Usuario',
    email: 'usuario@mail.com',
    image: '/store-logo.png',
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="min-w-0"
            onClick={() => setOpenMobile(false)}
          >
            <Link href="/" className="font-bold">
              <Logo />
              <span className="truncate">{businessInfo.nombreEmpresa}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuOptions.map((item) => (
                <MenuItem key={item.name} option={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* {menuOptions.map((option) => (
          <SidebarGroup key={option.title}>
            <SidebarGroupLabel>{option.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {option.items.map((item) => (
                  <MenuItem key={item.name} option={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))} */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{ name: user.name, email: user.email, avatar: user.image }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
