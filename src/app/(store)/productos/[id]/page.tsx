export const dynamic = 'force-dynamic';

import { ProductForm } from '@/components/forms/product';
import { notFound } from 'next/navigation';
import { PageProps } from '@/types/types';
import { getProvidersSelect } from '@/fetch-data/providers';
import { getCategoriesSelect } from '@/fetch-data/categories';
import { getProductById } from '@/fetch-data/products';

export async function generateMetadata(props: PageProps) {
  const { id } = await props.params;

  return {
    title: `Producto ${id}`,
  };
}

export default async function Page(props: PageProps) {
  const { id } = await props.params;
  const data = await getProductById(Number(id));
  const providers = await getProvidersSelect();
  const categories = await getCategoriesSelect();

  if (!data) {
    notFound();
  }

  return (
    <ProductForm
      action="edit"
      product={data}
      selectOptions={{ providers, categories }}
    />
  );
}
