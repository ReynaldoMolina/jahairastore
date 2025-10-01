export const dynamic = 'force-dynamic';

import { ProductForm } from '@/components/forms/product';
import { getCategoriesSelect } from '@/fetch-data/categories';
import { getProvidersSelect } from '@/fetch-data/providers';

export const metadata = {
  title: 'Crear producto',
};

export default async function Page() {
  const providers = await getProvidersSelect();
  const categories = await getCategoriesSelect();

  return (
    <ProductForm action="create" selectOptions={{ providers, categories }} />
  );
}
