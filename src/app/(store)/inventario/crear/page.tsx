export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateProductForm } from '@/components/form/product/create';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getSettingsCambioDolar } from '@/fetch-data/settings';
import { getProductCategoriesSelect } from '@/fetch-data/product-category';

export const metadata = {
  title: 'Crear producto',
};

export default async function Page() {
  await checkAuthorization();

  const cambioDolar = await getSettingsCambioDolar();
  const categories = await getProductCategoriesSelect();

  return (
    <>
      <SiteHeader title="Crear producto" />
      <PageWrapper>
        <CreateProductForm cambioDolar={cambioDolar} categories={categories} />
      </PageWrapper>
    </>
  );
}
