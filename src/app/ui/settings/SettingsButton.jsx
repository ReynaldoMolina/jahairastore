'use client';

import Link from 'next/link';
import SettingsIcon from '@/app/ui/icons/settings.svg';

export function SettingsButton() {
  return (
    <Link
      href="/ajustes"
      className="flex gap-2 px-3 py-2 items-center bg-sky-200 hover:bg-sky-300 rounded-lg"
    >
      <SettingsIcon className="size-5 text-black" />
      <span className="flex text-xs text-black">Ajustes</span>
    </Link>
  );
}
