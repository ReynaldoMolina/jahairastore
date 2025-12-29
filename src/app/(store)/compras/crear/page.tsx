import { checkAuthorization } from '@/authorization/check-authorization';
import { CreatePurchaseForm } from '@/components/forms/purchase/create';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getProvidersSelect } from '@/fetch-data/purchases';

export const metadata = {
  title: 'Crear compra',
};

export default async function Page() {
  await checkAuthorization();

  const selectOptions = await getProvidersSelect();

  return (
    <>
      <SiteHeader title="Crear compra" />
      <PageWrapper>
        <CreatePurchaseForm selectOptions={selectOptions} />
      </PageWrapper>
    </>
  );
}
