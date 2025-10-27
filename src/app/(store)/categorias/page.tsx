import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Categories from '@/components/lists/categories';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Categorías',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;

  return (
    <>
      <SiteHeader title="Categorías" dontShowBackButton />
      <PageWrapper>
        <SearchInput>
          <ListFilter searchParams={searchParams} />
        </SearchInput>
        <Categories searchParams={searchParams} />
      </PageWrapper>
    </>
  );
}
