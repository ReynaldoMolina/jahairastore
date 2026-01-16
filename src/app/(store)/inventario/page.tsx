import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/filters/header-filter';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Inventory } from '@/components/list/wrapper/inventory';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

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
        <Suspense fallback={<Spinner className="m-auto" />}>
          <Inventory
            searchParams={await searchParams}
            ubicacionLabel={ubicacionLabel}
          />
        </Suspense>
      </PageWrapper>
    </>
  );
}
