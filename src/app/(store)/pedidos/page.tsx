import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Orders from '@/components/lists/orders';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Pedidos',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;

  return (
    <>
      <SiteHeader title="Pedidos" dontShowBackButton />
      <PageWrapper>
        <SearchInput>
          <ListFilter showState={true} searchParams={searchParams} />
        </SearchInput>
        <Orders searchParams={searchParams} />
      </PageWrapper>
    </>
  );
}
