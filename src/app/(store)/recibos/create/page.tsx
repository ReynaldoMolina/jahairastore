import { checkAuthorization } from '@/authorization/check-authorization';
import { ReceiptForm } from '@/components/forms/receipt';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getClientsSelect } from '@/fetch-data/data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Crear recibo',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;
  const selectData = await getClientsSelect();

  return (
    <>
      <SiteHeader title="Crear recibo" />
      <PageWrapper>
        <ReceiptForm
          isNew={true}
          searchParams={searchParams}
          selectData={selectData}
        />
      </PageWrapper>
    </>
  );
}
