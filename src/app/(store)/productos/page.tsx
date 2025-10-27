import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Products from '@/components/lists/products';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Productos',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;

  return (
    <>
      <SiteHeader title="Productos" dontShowBackButton />
      <PageWrapper>
        <SearchInput>
          <ListFilter searchParams={searchParams} />
        </SearchInput>
        <Products searchParams={searchParams} />
      </PageWrapper>
    </>
  );
}
