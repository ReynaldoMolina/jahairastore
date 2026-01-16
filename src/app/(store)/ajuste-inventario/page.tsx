import { checkAuthorization } from '@/authorization/check-authorization';
import { SearchInput } from '@/components/filter/search-input';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Wrapper } from '@/components/list/wrapper/ajuste';

export const metadata = {
  title: 'Ajuste de inventario',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader
        title="Ajuste de inventario"
        showHeaderActions
        hideBackButton
      />
      <PageWrapper>
        <SearchInput />
        <Suspense fallback={<Spinner className="m-auto" />}>
          <Wrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  );
}
