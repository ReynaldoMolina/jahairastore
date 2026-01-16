import { checkAuthorization } from '@/authorization/check-authorization';
import { HeaderFilter } from '@/components/filter/header-filter';
import { SearchInput } from '@/components/filter/search-input';
import { Tareas } from '@/components/list/task';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getTareas } from '@/fetch-data/task';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Tareas',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getTareas(await searchParams);

  return (
    <>
      <SiteHeader title="Tareas" showHeaderActions hideBackButton>
        <HeaderFilter listName="tareas" />
      </SiteHeader>
      <PageWrapper>
        <SearchInput />
        <Tareas data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
