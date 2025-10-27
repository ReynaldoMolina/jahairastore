import { checkAuthorization } from '@/authorization/check-authorization';
import { ProductForm } from '@/components/forms/product';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Crear producto',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Crear producto" />
      <PageWrapper>
        <ProductForm isNew={true} />
      </PageWrapper>
    </>
  );
}
