'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function NewRegister({ allowNew = true }) {
  const pathname = usePathname();
  let href = `${pathname}/create`;

  return (
    <Link
      href={href}
      className={`${
        !allowNew && 'hidden'
      } flex gap-2 fixed md:static bottom-20 right-3 py-4 px-4 md:py-2 w-fit bg-green-300 dark:bg-green-700 rounded-full md:rounded-lg cursor-pointer shadow-md dark:shadow-none hover:bg-green-400 dark:hover:bg-green-600 items-center z-10`}
    >
      <Plus />
      <span className="text-sm font-semibold">Nuevo</span>
    </Link>
  );
}
