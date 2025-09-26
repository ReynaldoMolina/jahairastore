export const dynamic = 'force-dynamic';

import { getBusinessInfo } from '@/fetch-data/data';
import { notFound } from 'next/navigation';
import { isDemo } from '@/middleware';
import { SettingsForm } from '@/components/forms/settings';

export const metadata = {
  title: 'Ajustes',
};

export default async function Page() {
  if (isDemo) {
    notFound();
  }

  const businessInfo = await getBusinessInfo();

  return (
    <>
      <SettingsForm businessInfo={businessInfo} />
    </>
  );
}
