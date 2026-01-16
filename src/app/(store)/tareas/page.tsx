import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/filter/header-filter';
import { SearchInput } from '@/components/filter/search-input';
import { Tareas } from '@/components/list/task';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getTareas } from '@/fetch-data/task';
import { PageProps } from '@/types/types';
import { Suspense } from 'react';
import Loading from '@/components/loading';
import { Wrapper } from '@/components/list/wrapper/task';

export const metadata = {
  title: 'Tareas',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Tareas" showHeaderActions hideBackButton>
        <HeaderFilter listName="tareas" />
      </SiteHeader>
      <PageWrapper>
        <SearchInput />
        <Suspense fallback={<Loading />}>
          <Wrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  );
}
