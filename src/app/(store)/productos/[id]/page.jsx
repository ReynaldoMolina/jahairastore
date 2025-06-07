import { ProductEdit } from '@/app/ui/forms/ProductForm';
import { getProductById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Producto ${id}`
  }
}
 
export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const data = await getProductById(id);

  if (!data) {
    notFound();
  }
 
  return (
    <section className="flex grow overflow-y-scroll h-0">
      <ProductEdit product={data} />
    </section>
  );
}