import { ProductEdit } from '@/app/ui/forms/ProductForm';
import { getProductById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Editar producto'
}
 
export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const data = await getProductById(id);

  if (!data) {
    notFound();
  }
 
  return (
    <ProductEdit product={data} />
  );
}