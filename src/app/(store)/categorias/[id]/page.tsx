import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';
import { getProductCategoryById } from '@/fetch-data/product-category';
import { EditCategoryForm } from '@/components/form/product-category/edit';

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

  return (
    <>
      <SiteHeader title={`Categoría ${id}`} />
      <PageWrapper>
        <EditCategoryForm category={category} />
      </PageWrapper>
    </>
  );
}
