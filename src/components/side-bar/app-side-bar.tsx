'use client';

import { MenuItem } from './menu-item';
import { menuOptions } from './menu-options';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
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
          <SidebarMenuButton>
            <Logo />
            <span className="truncate font-bold">
              {businessInfo.nombreEmpresa}
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuOptions.map((item) => (
                <MenuItem key={item.name} option={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{ name: user.name, email: user.email, avatar: user.image }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
