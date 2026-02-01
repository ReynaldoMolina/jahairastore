export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateProductFormDialog } from '@/components/form/product/create-dialog';
import { getProductCategoriesSelect } from '@/fetch-data/product-category';
import { getSettingsCambioDolar } from '@/fetch-data/settings';

export const metadata = {
  title: 'Crear producto',
};

export default async function Page() {
  await checkAuthorization();

  const cambioDolar = await getSettingsCambioDolar();
  const categories = await getProductCategoriesSelect();

  return (
    <CreateProductFormDialog
      cambioDolar={cambioDolar}
      categories={categories}
    />
  );
}
