import Link from 'next/link';
import SideMenuIcon from '@/app/ui/sidemenu/SideMenuIcon/sidemenuicon';
import { usePathname } from 'next/navigation';

export function MenuItem({ option }) {
  const pathname = usePathname();
  const isActive =
    option.path === '/' ? pathname === '/' : pathname.includes(option.path);

  return (
    <Link
      href={option.url}
      className={`flex flex-col min-w-17 w-full justify-center items-center cursor-pointer rounded-lg hover:bg-sky-200 dark:hover:bg-neutral-700 gap-1 p-2 md:py-4 text-xs text-center ${
        isActive && 'bg-sky-200 dark:bg-neutral-700'
      }`}
    >
      <SideMenuIcon name={option.name} />
      {option.name}
    </Link>
  );
}
