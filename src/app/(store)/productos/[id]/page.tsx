export const dynamic = 'force-dynamic';

import { ProductForm } from '@/components/forms/product';
import { notFound } from 'next/navigation';
import { PageProps } from '@/types/types';
import { getProvidersSelect } from '@/fetch-data/provider';
import { getCategoriesSelect } from '@/fetch-data/category';
import { getProductById } from '@/fetch-data/product';
import { getCambioDolar } from '@/fetch-data/config';

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
  const cambioDolar = await getCambioDolar();

  if (!data) {
    notFound();
  }

  return (
    <ProductForm
      action="edit"
      product={data}
      selectOptions={{ providers, categories }}
      cambioDolarConfig={cambioDolar}
    />
  );
}
