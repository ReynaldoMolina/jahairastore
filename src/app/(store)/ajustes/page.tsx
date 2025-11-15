export const dynamic = 'force-dynamic';

import { SettingsForm } from '@/components/forms/settings';
import { getSettings } from '@/fetch-data/settings';
import { checkAuthorization } from '@/authorization/check-authorization';
import { SiteHeader } from '@/components/site-header';
import { PageWrapper } from '@/components/page-wrapper';

export const metadata = {
  title: 'Ajustes',
};

export default async function Page() {
  await checkAuthorization();

  const data = await getSettings();

  return (
    <>
      <SiteHeader title="Ajustes" />
      <PageWrapper>
        <SettingsForm data={data} />
      </PageWrapper>
    </>
  );
}
