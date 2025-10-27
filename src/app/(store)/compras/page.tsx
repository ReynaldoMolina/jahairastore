import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Purchases from '@/components/lists/purchases';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Compras',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;

  return (
    <>
      <SiteHeader title="Compras" dontShowBackButton />
      <PageWrapper>
        <SearchInput>
          <ListFilter searchParams={searchParams} />
        </SearchInput>
        <Purchases searchParams={searchParams} />
      </PageWrapper>
    </>
  );
}
