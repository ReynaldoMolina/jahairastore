export const dynamic = 'force-dynamic';

import { SettingsForm } from '@/app/ui/settings/SettingsForm';
import { getBusinessInfo } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { isDemo } from '@/middleware';

export const metadata = {
  title: 'Configuración',
};

export default async function Page() {
  if (isDemo) {
    notFound();
  }

  const data = await getBusinessInfo();

  return (
    <>
      <SettingsForm data={data} />
    </>
  );
}
