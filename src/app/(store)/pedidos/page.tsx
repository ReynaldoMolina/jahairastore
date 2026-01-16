import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/filter/header-filter';
import { SearchInput } from '@/components/filter/search-input';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Wrapper } from '@/components/list/wrapper/order';

export const metadata = {
  title: 'Pedidos',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Pedidos" showHeaderActions hideBackButton>
        <HeaderFilter listName="pedidos" />
      </SiteHeader>
      <PageWrapper>
        <SearchInput />
        <Suspense fallback={<Spinner />}>
          <Wrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  );
}
