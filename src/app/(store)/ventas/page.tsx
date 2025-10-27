import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Sales from '@/components/lists/sales';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Ventas',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;

  return (
    <>
      <SiteHeader title="Ventas" dontShowBackButton />
      <PageWrapper>
        <SearchInput>
          <ListFilter showState={true} searchParams={searchParams} />
        </SearchInput>
        <Sales searchParams={searchParams} />
      </PageWrapper>
    </>
  );
}
