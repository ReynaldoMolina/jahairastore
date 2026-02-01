import { checkAuthorization } from '@/authorization/check-authorization';
import { EditCategoryFormDialog } from '@/components/form/product-category/edit-dialog';
import { getProductCategoryById } from '@/fetch-data/product-category';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Categoría ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const category = await getProductCategoryById(id);

  if (!category) {
    notFound();
  }

  return <EditCategoryFormDialog category={category} />;
}
