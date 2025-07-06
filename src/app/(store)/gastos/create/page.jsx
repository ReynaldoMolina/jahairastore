import { ExpenseForm } from '@/app/ui/forms/ExpenseForm';
import { FormSelect } from '@/app/ui/forms/FormInputs/formInputsServer';

export const metadata = {
  title: 'Crear gasto',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <ExpenseForm isNew={true} searchParams={searchParams}>
      <FormSelect value="" name="Id_proveedor" />
    </ExpenseForm>
  );
}
