export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateProductForm } from '@/components/forms/product/create';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getSettingsCambioDolar } from '@/fetch-data/settings';

export const metadata = {
  title: 'Crear producto',
};

export default async function Page() {
  await checkAuthorization();

  const cambioDolar = await getSettingsCambioDolar();

  return (
    <>
      <SiteHeader title="Crear producto" />
      <PageWrapper>
        <CreateProductForm cambioDolar={cambioDolar} />
      </PageWrapper>
    </>
  );
}
