import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SideMenuIcon } from './side-menu-icon';

export function MenuItem({ option }) {
  const pathname = usePathname();
  const isActive =
    option.url === '/' ? pathname === '/' : pathname.includes(option.url);

  return (
    <div
      key={option.id}
      className="flex md:flex-col items-center gap-1 w-full h-fit"
    >
      <Link
        href={option.url}
        className={`flex flex-col min-w-17 md:w-full justify-center items-center cursor-pointer rounded-lg hover:bg-sky-200 hover:dark:text-background gap-1 p-2 md:py-4 text-xs text-center ${
          isActive && 'bg-sky-200 dark:text-background'
        }`}
      >
        <SideMenuIcon name={option.name} />
        {option.name}
      </Link>
      {option.divider && (
        <div className="h-8/10 md:h-0 md:w-8/10 border-r-1 border-b-1 border-sidebar-border"></div>
      )}
    </div>
  );
}
