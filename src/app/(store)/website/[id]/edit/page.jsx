import { WebsiteProductEdit } from '@/app/ui/forms/WebsiteProductsForm';
import { getWebsiteProductById } from '@/app/lib/data';
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
  const data = await getWebsiteProductById(id);

  if (!data) {
    notFound();
  }
 
  return (
    <WebsiteProductEdit product={data} />
  );
}