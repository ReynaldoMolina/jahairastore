import { ProductForm } from '@/app/ui/forms/ProductForm';
import { FormSelect } from '@/app/ui/forms/FormInputs/formInputsServer';

export const metadata = {
  title: 'Crear producto',
};

export default async function Page() {
  return (
    <ProductForm isNew={true}>
      <FormSelect value="" name="Id_proveedor" />
      <FormSelect value="" name="Id_categoria" />
    </ProductForm>
  );
}
