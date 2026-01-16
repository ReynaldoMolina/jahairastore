export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { SiteHeader } from '@/components/header/site-header';
import { PageWrapper } from '@/components/page-wrapper';
import { Suspense } from 'react';
import { Wrapper } from '@/components/list/wrapper/settings';
import Loading from '@/components/loading';

export const metadata = {
  title: 'Ajustes',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Ajustes" hideBackButton />
      <PageWrapper>
        <Suspense fallback={<Loading />}>
          <Wrapper />
        </Suspense>
      </PageWrapper>
    </>
  );
}
