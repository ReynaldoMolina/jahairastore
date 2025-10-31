export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { EditProductForm } from '@/components/forms/product/edit';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
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

  return (
    <>
      <SiteHeader title={`Producto ${id}`} />
      <PageWrapper>
        <EditProductForm product={data} />
      </PageWrapper>
    </>
  );
}
