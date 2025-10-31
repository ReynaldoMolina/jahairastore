export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { EditProductFormDialog } from '@/components/forms/product/edit-dialog';
import { getProductById } from '@/fetch-data/product';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Producto ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const data = await getProductById(id);

  if (!data) {
    notFound();
  }

  return <EditProductFormDialog product={data} />;
}
