export const dynamic = 'force-dynamic';

import { ProductForm } from '@/app/ui/forms/ProductForm';
import { getProductById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { getProvidersSelect, getCategoriesSelect } from '@/app/lib/data';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Producto ${id}`,
  };
}

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const data = await getProductById(id);
  const providersData = await getProvidersSelect();
  const categoriesData = await getCategoriesSelect();

  if (!data) {
    notFound();
  }

  return (
    <ProductForm
      isNew={false}
      product={data}
      providersData={providersData}
      categoriesData={categoriesData}
    />
  );
}
