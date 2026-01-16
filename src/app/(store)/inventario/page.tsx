import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/filter/header-filter';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Suspense } from 'react';
import Loading from '@/components/loading';
import { Wrapper } from '@/components/list/wrapper/inventory';

export async function generateMetadata({ searchParams }: PageProps) {
  const ubicacion = (await searchParams).ubicacion || '';
  const label =
    ubicacion === '' ? 'Total' : ubicacion === '1' ? 'León' : 'Acoyapa';

  return {
    title: `Inventario - ${label}`,
  };
}

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const ubicacion = (await searchParams).ubicacion || '';
  const ubicacionLabel =
    ubicacion === '' ? 'Total' : ubicacion === '1' ? 'León' : 'Acoyapa';

  return (
    <>
      <SiteHeader
        title={`Inventario - ${ubicacionLabel}`}
        showHeaderActions
        hideBackButton
      >
        <HeaderFilter listName="inventario" />
      </SiteHeader>
      <PageWrapper>
        <Suspense fallback={<Loading />}>
          <Wrapper
            searchParams={await searchParams}
            ubicacionLabel={ubicacionLabel}
          />
        </Suspense>
      </PageWrapper>
    </>
  );
}
