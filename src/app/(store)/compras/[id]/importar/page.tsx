import { checkAuthorization } from '@/authorization/check-authorization';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { PageProps } from '@/types/types';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ImportPurchase } from '@/components/form/purchase/import';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Compra ${id} - Importar factura`,
  };
}

export default async function Page({ params }: PageProps) {
  await checkAuthorization();

  const { id } = await params;

  return (
    <>
      <SiteHeader title={`Compra ${id} - Importar`} />
      <PageWrapper>
        <ImportPurchase purchaseId={Number(id)} />
      </PageWrapper>
    </>
  );
}
