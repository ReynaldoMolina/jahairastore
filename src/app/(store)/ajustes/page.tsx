export const dynamic = 'force-dynamic';

import { AppSettingsForm } from '@/components/form/settings/app-settings';
import { getSettings } from '@/fetch-data/settings';
import { checkAuthorization } from '@/authorization/check-authorization';
import { SiteHeader } from '@/components/header/site-header';
import { PageWrapper } from '@/components/page-wrapper';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Wrapper } from '@/components/list/wrapper/settings';

export const metadata = {
  title: 'Ajustes',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Ajustes" hideBackButton />
      <PageWrapper>
        <Suspense fallback={<Spinner className="m-auto" />}>
          <Wrapper />
        </Suspense>
      </PageWrapper>
    </>
  );
}
