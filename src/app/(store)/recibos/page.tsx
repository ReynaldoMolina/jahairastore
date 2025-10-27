import { checkAuthorization } from '@/authorization/check-authorization';
import { ListFilter } from '@/components/actiontools/list-filter';
import SearchInput from '@/components/actiontools/search-input';
import Receipts from '@/components/lists/receipts';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Recibos',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;

  return (
    <>
      <SiteHeader title="Recibos" dontShowBackButton />
      <PageWrapper>
        <SearchInput allowNew={false}>
          <ListFilter searchParams={searchParams} />
        </SearchInput>
        <Receipts searchParams={searchParams} />
      </PageWrapper>
    </>
  );
}
