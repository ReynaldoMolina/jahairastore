import { ReceiptEdit } from '@/app/ui/forms/ReceiptForm';
import { getReceiptById, getReceiptPdf } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Recibo ${id}`
  }
}
 
export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const receipt = await getReceiptById(id);
  const receiptpdf = await getReceiptPdf(id);

  if (!receipt) {
    notFound();
  }
 
  return (
    <ReceiptEdit receipt={receipt} receiptpdf={receiptpdf} />
  );
}