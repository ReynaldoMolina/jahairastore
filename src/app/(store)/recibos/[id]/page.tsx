export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { ReceiptForm } from '@/components/forms/receipt';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import {
  getClientsSelect,
  getReceiptById,
  getReceiptPdf,
} from '@/fetch-data/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Recibo ${id}`,
  };
}

export default async function Page(props) {
  await checkAuthorization();

  const params = await props.params;
  const id = params.id;
  const receipt = await getReceiptById(id);
  const receiptpdf = await getReceiptPdf(id);
  const selectData = await getClientsSelect();

  if (!receipt) {
    notFound();
  }

  return (
    <>
      <SiteHeader title={`Recibo ${id}`} />
      <PageWrapper>
        <ReceiptForm
          isNew={false}
          receipt={receipt}
          receiptpdf={receiptpdf}
          selectData={selectData}
        />
      </PageWrapper>
    </>
  );
}
