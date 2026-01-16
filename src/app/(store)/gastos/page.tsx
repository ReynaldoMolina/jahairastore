import { checkAuthorization } from '@/authorization/check-authorization';
import { SearchInput } from '@/components/filters/search-input';
import { Expenses } from '@/components/list/expense';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
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
      <SiteHeader
        title="Gastos"
        showHeaderActions
        hideNewButton
        hideBackButton
      />
      <PageWrapper>
        <SearchInput />
        <Expenses data={data} query={query} totalPages={totalPages} />
      </PageWrapper>
    </>
  );
}
