import { checkAuthorization } from '@/authorization/check-authorization';
import { SearchInput } from '@/components/filter/search-input';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Suspense } from 'react';
import Loading from '@/components/loading';
import { Wrapper } from '@/components/list/wrapper/category';

export const metadata = {
  title: 'Categorías de productos',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader
        title="Categorías de productos"
        showHeaderActions
        hideBackButton
      />
      <PageWrapper>
        <SearchInput />
        <Suspense fallback={<Loading />}>
          <Wrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  );
}
