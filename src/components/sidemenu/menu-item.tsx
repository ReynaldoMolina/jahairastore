import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MenuItem({ option }) {
  const pathname = usePathname();
  const isActive =
    option.url === '/' ? pathname === '/' : pathname.includes(option.url);

  return (
    <div key={option.id} className="flex md:flex-col items-center w-full gap-1">
      <Link
        href={option.url}
        className={`flex flex-col md:flex-row min-w-17 md:w-full justify-center md:justify-start items-center cursor-pointer rounded-lg md:rounded-md gap-1 md:gap-2 p-2 md:py-2 text-xs ${
          isActive
            ? 'bg-brand hover:bg-brand/90 dark:text-background font-semibold'
            : 'hover:bg-sidebar-accent'
        }`}
      >
        <option.icon className="size-5 md:size-3.5" />
        {option.name}
      </Link>
      {option.divider && (
        <div className="h-8/10 md:h-0 md:w-9/10 border-r-1 border-b-1 border-sidebar-border"></div>
      )}
    </div>
  );
}
