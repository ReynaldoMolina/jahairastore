export const dynamic = 'force-dynamic';

import { SettingsForm } from '@/components/settings/SettingsForm';
import { getBusinessInfo } from '@/fetch-data/data';
import { notFound } from 'next/navigation';
import { isDemo } from '@/middleware';

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
