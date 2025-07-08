import { ReceiptForm } from '@/app/ui/forms/ReceiptForm';
import {
  getClientsSelect,
  getReceiptById,
  getReceiptPdf,
} from '@/app/lib/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Recibo ${id}`,
  };
}

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const receipt = await getReceiptById(id);
  const receiptpdf = await getReceiptPdf(id);
  const selectData = await getClientsSelect();

  if (!receipt) {
    notFound();
  }

  return (
    <ReceiptForm
      isNew={false}
      receipt={receipt}
      receiptpdf={receiptpdf}
      selectData={selectData}
    />
  );
}
