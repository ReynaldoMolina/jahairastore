import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Expenses from '@/components/lists/expenses';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Gastos',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;

  return (
    <>
      <SiteHeader title="Gastos" dontShowBackButton />
      <PageWrapper>
        <SearchInput allowNew={false}>
          <ListFilter searchParams={searchParams} />
        </SearchInput>
        <Expenses searchParams={searchParams} />
      </PageWrapper>
    </>
  );
}
