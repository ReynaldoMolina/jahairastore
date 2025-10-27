import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Inventory from '@/components/lists/inventory';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Inventario',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;

  return (
    <>
      <SiteHeader title="Inventario" dontShowBackButton />
      <PageWrapper>
        <SearchInput allowNew={false}>
          <ListFilter
            showState={true}
            stateLabel="Disponibles"
            searchParams={searchParams}
          />
        </SearchInput>
        <Inventory searchParams={searchParams} />
      </PageWrapper>
    </>
  );
}
