import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/filter/header-filter';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Wrapper } from '@/components/list/wrapper/sale';
import { Suspense } from 'react';
import Loading from '@/components/loading';
import { SearchInput } from '@/components/filter/search-input';
import { DateRangeButtons } from '@/components/filter/date-range-buttons';

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
        <div className="flex flex-col md:flex-row gap-2">
          <SearchInput />
          <DateRangeButtons
            searchParams={await searchParams}
            className="md:ml-auto"
          />
        </div>
        <Suspense fallback={<Loading />}>
          <Wrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  );
}
