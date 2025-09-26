export const dynamic = 'force-dynamic';

import { getBusinessInfo } from '@/fetch-data/data';
import { notFound } from 'next/navigation';
import { isDemo } from '@/middleware';
import { SettingsForm } from '@/components/settings/settings-form';

export const metadata = {
  title: 'Ajustes',
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
