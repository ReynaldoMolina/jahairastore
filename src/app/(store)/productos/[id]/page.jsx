import { ProductForm } from '@/app/ui/forms/ProductForm';
import { getProductById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { FormSelect } from '@/app/ui/forms/FormInputs/formInputsServer';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Producto ${id}`,
  };
}

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const data = await getProductById(id);

  if (!data) {
    notFound();
  }

  return (
    <ProductForm product={data}>
      <FormSelect value={data.Id_proveedor} name="Id_proveedor" />
      <FormSelect value={data.Id_categoria} name="Id_categoria" />
    </ProductForm>
  );
}
