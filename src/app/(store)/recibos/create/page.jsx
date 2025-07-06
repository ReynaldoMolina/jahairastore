import { ReceiptForm } from '@/app/ui/forms/ReceiptForm';
import { FormSelect } from '@/app/ui/forms/FormInputs/formInputsServer';

export const metadata = {
  title: 'Crear recibo',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <ReceiptForm isNew={true} searchParams={searchParams}>
      <FormSelect value="" name="Id_cliente" />
    </ReceiptForm>
  );
}
