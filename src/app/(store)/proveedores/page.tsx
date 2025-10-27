import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Providers from '@/components/lists/providers';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Proveedores',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;

  return (
    <>
      <SiteHeader title="Proveedores" dontShowBackButton />
      <PageWrapper>
        <SearchInput>
          <ListFilter searchParams={searchParams} />
        </SearchInput>
        <Providers searchParams={searchParams} />
      </PageWrapper>
    </>
  );
}
