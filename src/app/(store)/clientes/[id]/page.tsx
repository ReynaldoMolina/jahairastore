import { ClientForm } from '@/components/forms/client';
import { getClientById } from '@/fetch-data/clients';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: PageProps) {
  const { id } = await props.params;

  return {
    title: `Cliente ${id}`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);
  const data = await getClientById(id);

  if (!data) {
    notFound();
  }

  return <ClientForm isNew={false} client={data} />;
}
