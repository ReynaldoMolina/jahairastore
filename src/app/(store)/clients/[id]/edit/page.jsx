import { ClientEdit } from '@/app/ui/forms/ClientForm';
import { getClientById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Editar cliente'
}
 
export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const data = await getClientById(id);

  if (!data) {
    notFound();
  }
 
  return (
    <ClientEdit client={data} />
  );
}