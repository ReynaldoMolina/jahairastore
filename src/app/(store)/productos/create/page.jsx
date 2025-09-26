export const dynamic = 'force-dynamic';

import { ProductForm } from '@/components/forms/ProductForm';
import { getProvidersSelect, getCategoriesSelect } from '@/fetch-data/data';

export const metadata = {
  title: 'Crear producto',
};

export default async function Page() {
  const providersData = await getProvidersSelect();
  const categoriesData = await getCategoriesSelect();

  return (
    <ProductForm
      isNew={true}
      providersData={providersData}
      categoriesData={categoriesData}
    />
  );
}
