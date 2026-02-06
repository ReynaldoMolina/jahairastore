import { checkAuthorization } from '@/authorization/check-authorization';
import { SearchInput } from '@/components/filter/search-input';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Suspense } from 'react';
import { Wrapper } from '@/components/list/wrapper/purchase';
import Loading from '@/components/loading';
import { DateRangeButtons } from '@/components/filter/date-range-buttons';

export const metadata = {
  title: 'Compras',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Compras" showHeaderActions hideBackButton />
      <PageWrapper>
        <Suspense fallback={<Loading />}>
          <div className="flex flex-col md:flex-row gap-2">
            <SearchInput />
            <DateRangeButtons searchParams={await searchParams} />
          </div>
          <Wrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  );
}
