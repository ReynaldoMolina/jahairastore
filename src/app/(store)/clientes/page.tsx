import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Clients from '@/components/lists/clients';
import { ListTitle } from '@/components/lists/lists';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Clientes',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;

  return (
    <>
      <SiteHeader title="Clientes" dontShowBackButton />
      <PageWrapper>
        <SearchInput>
          <ListFilter searchParams={searchParams} />
        </SearchInput>
        <Clients searchParams={searchParams} />
      </PageWrapper>
    </>
  );
}
