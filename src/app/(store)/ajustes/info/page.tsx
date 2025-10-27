export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { isDemo } from '@/middleware';
import { SettingsForm } from '@/components/settings/settings-form';
import { getBusinessInfo } from '@/fetch-data/settings';
import { checkAuthorization } from '@/authorization/check-authorization';

export const metadata = {
  title: 'Ajustes',
};

export default async function Page() {
  await checkAuthorization();

  if (isDemo) {
    notFound();
  }

  const data = await getBusinessInfo();

  return <SettingsForm data={data} />;
}
