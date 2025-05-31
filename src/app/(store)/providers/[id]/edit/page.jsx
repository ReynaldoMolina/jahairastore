import { ProviderEdit } from '@/app/ui/forms/ProviderForm';
import { getProviderById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Editar proveedor'
}
 
export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const data = await getProviderById(id);

  if (!data) {
    notFound();
  }
 
  return (
    <ProviderEdit provider={data} />
  );
}