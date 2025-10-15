import { ClientForm } from '@/components/forms/client';
import { getClientById } from '@/fetch-data/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Cliente ${id}`,
  };
}

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const data = await getClientById(id);

  if (!data) {
    notFound();
  }

  return <ClientForm isNew={false} client={data} />;
}
