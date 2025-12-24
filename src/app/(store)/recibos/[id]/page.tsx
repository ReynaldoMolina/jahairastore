import { checkAuthorization } from '@/authorization/check-authorization';
import { EditReceiptForm } from '@/components/forms/receipt/edit';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getReceiptById } from '@/fetch-data/receipts';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Recibo ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const receipt = await getReceiptById(id);

  console.log(receipt);

  if (!receipt) {
    notFound();
  }

  return (
    <>
      <SiteHeader title={`Recibo ${id} - ${receipt.nombreCliente}`} />
      <PageWrapper>
        <EditReceiptForm receipt={receipt} />
      </PageWrapper>
    </>
  );
}
