import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar';
import { MenuOption } from './menu-options';

interface MenuItem {
  option: MenuOption;
}

export function MenuItem({ option }: MenuItem) {
  const { setOpenMobile } = useSidebar();

  const pathname = usePathname();
  const isActive =
    option.url === '/' ? pathname === '/' : pathname.includes(option.url);

  return (
    <SidebarMenuItem key={option.name}>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className="data-[active=true]:bg-brand data-[active=true]:text-black"
      >
        <Link href={option.url} onClick={() => setOpenMobile(false)}>
          <option.icon className="size-4 md:size-3.5" />
          {option.name}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
