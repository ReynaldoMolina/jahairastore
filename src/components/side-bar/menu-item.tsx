import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { MenuOption } from './menu-options';

interface MenuItem {
  option: MenuOption;
}

export function MenuItem({ option }: MenuItem) {
  const pathname = usePathname();
  const isActive =
    option.url === '/' ? pathname === '/' : pathname.includes(option.url);

  return (
    <Link
      href={option.url}
      className={`flex flex-col justify-center items-center cursor-pointer rounded-lg gap-1 p-2 min-w-14 shrink-0 ${
        isActive
          ? 'bg-brand hover:bg-brand dark:text-background'
          : 'hover:bg-muted/80'
      }`}
    >
      <option.icon className="size-4" />
      <span className="text-[0.625rem]">{option.name}</span>
    </Link>
  );
}

export function MenuItemDesktop({ option }: MenuItem) {
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
        <Link href={option.url}>
          <option.icon className="size-4 md:size-3.5" />
          {option.name}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
