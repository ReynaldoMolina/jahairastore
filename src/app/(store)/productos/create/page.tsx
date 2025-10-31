import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateProductForm } from '@/components/forms/product/create';
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
        <CreateProductForm />
      </PageWrapper>
    </>
  );
}
