import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/filter/header-filter';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Wrapper } from '@/components/list/wrapper/sale';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { SearchInput } from '@/components/filter/search-input';

export const metadata = {
  title: 'Ventas',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Ventas" showHeaderActions hideBackButton>
        <HeaderFilter listName="ventas" />
      </SiteHeader>
      <PageWrapper>
        <Suspense fallback={<Spinner className="m-auto" />}>
          <SearchInput />
          <Wrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  );
}
