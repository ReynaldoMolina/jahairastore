import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar';
import { MenuOption } from './menu-options';

interface MenuItem {
  option: MenuOption;
}

// export function MenuItem({ option }: MenuItem) {
//   const pathname = usePathname();
//   const isActive =
//     option.url === '/' ? pathname === '/' : pathname.includes(option.url);

//   return (
//     <Link
//       href={option.url}
//       className="flex flex-col justify-center items-center cursor-pointer rounded-lg gap-1 p-2 min-w-17 shrink-0 hover:bg-muted/80"
//     >
//       <div
//         className={cn(
//           'inline-flex rounded-full p-1 w-10 justify-center',
//           isActive ? 'bg-brand dark:text-background' : ''
//         )}
//       >
//         <option.icon className="size-4" />
//       </div>
//       <span className={cn('text-[0.625rem]', isActive ? 'font-bold' : '')}>
//         {option.name}
//       </span>
//     </Link>
//   );
// }

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
