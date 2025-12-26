import { checkAuthorization } from '@/authorization/check-authorization';
import { SearchInput } from '@/components/actiontools/search-input';
import { Expenses } from '@/components/lists/expenses';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getExpenses } from '@/fetch-data/expenses';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Gastos',
};

export default async function Page({ searchParams }: PageProps) {
  await checkAuthorization();

  const { data, query, totalPages } = await getExpenses(await searchParams);

  return (
    <>
      <SiteHeader title="Gastos" showActionBar hideNewButton hideBackButton />
      <PageWrapper>
        <SearchInput />
        <Expenses data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
