export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { ProductForm } from '@/components/forms/product';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getProductById } from '@/fetch-data/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Producto ${id}`,
  };
}

export default async function Page(props) {
  await checkAuthorization();

  const params = await props.params;
  const id = params.id;
  const data = await getProductById(id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title={`Producto ${id}`} />
      <PageWrapper>
        <ProductForm isNew={false} product={data} />
      </PageWrapper>
    </>
  );
}
