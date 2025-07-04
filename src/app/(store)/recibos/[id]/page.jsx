import { ReceiptForm } from '@/app/ui/forms/ReceiptForm';
import { getReceiptById, getReceiptPdf } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { FormSelect } from '@/app/ui/forms/FormInputs/formInputsServer';

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

  if (!receipt) {
    notFound();
  }

  return (
    <ReceiptForm isNew={false} receipt={receipt} receiptpdf={receiptpdf}>
      <FormSelect
        value={receipt.Id_cliente}
        name="Id_cliente"
        label="Cliente"
      />
    </ReceiptForm>
  );
}
