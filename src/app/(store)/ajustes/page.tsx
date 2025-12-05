export const dynamic = 'force-dynamic';

import { AppSettingsForm } from '@/components/forms/settings/app-settings';
import { getSettings, getUserSettings } from '@/fetch-data/settings';
import { checkAuthorization } from '@/authorization/check-authorization';
import { SiteHeader } from '@/components/site-header';
import { PageWrapper } from '@/components/page-wrapper';
import { getServerSession } from '@/authorization/get-server-session';

export const metadata = {
  title: 'Ajustes',
};

export default async function Page() {
  await checkAuthorization();

  const { user } = await getServerSession();
  const appData = await getSettings();
  const userData = await getUserSettings(user.id);

  return (
    <>
      <SiteHeader title="Ajustes" showSidebarTrigger hideBackButton />
      <PageWrapper>
        <AppSettingsForm appData={appData} userData={userData} />
      </PageWrapper>
    </>
  );
}
