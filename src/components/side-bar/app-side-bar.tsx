'use client';

import { MenuItem, MenuSubItem } from './menu-item';
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
  SidebarMenuSub,
} from '../ui/sidebar';
import { NavUser } from './nav-user';
import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import { BusinessInfoType } from '@/types/types';
import { menuOptions } from './menu-options';
import Image from 'next/image';

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
            <Image src="/logominimal.svg" alt="icon" height={16} width={16} />
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
                <MenuItem key={item.name} option={item}>
                  {item.items ? (
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <MenuSubItem key={item.name} option={item} />
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </MenuItem>
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
