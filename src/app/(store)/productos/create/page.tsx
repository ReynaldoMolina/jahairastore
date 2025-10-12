export const dynamic = 'force-dynamic';

import { ProductoForm } from '@/components/forms/product/form';
import { getCategoriesSelect } from '@/fetch-data/category';
import { getCambioDolar } from '@/fetch-data/config';
import { getProvidersSelect } from '@/fetch-data/provider';

export const metadata = {
  title: 'Crear producto',
};

export default async function Page() {
  const providers = await getProvidersSelect();
  const categories = await getCategoriesSelect();
  const cambioDolar = await getCambioDolar();

  return (
    <ProductoForm
      action="create"
      selectOptions={{ providers, categories }}
      cambioDolarConfig={cambioDolar ?? 1}
    />
  );
}
