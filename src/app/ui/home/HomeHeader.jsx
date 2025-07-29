import { isDemo } from '@/middleware';
import { SettingsButton } from '../settings/SettingsButton';

export function HomeHeader({ businessInfo }) {
  if (isDemo) return;

  return (
    <header className="flex gap-1 items-center justify-between w-full">
      <h1 className="font-bold pl-2">{businessInfo.Nombre_empresa}</h1>
      <SettingsButton />
    </header>
  );
}
