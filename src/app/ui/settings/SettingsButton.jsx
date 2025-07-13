'use client';

import Link from 'next/link';
import SettingsIcon from '@/app/ui/icons/settings.svg';

export function SettingsButton() {
  return (
    <Link
      href="/configuracion"
      className="flex gap-1 px-3 py-2 items-center bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-lg"
    >
      <span className="hidden md:flex text-xs">Configuración</span>
      <SettingsIcon className="size-5" />
    </Link>
  );
}
