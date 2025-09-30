import { ProviderForm } from '@/components/forms/provider';
import { getProviderById } from '@/fetch-data/providers';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: PageProps) {
  const { id } = await props.params;

  return {
    title: `Proveedor ${id}`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);
  const data = await getProviderById(id);

  if (!data) {
    notFound();
  }

  return <ProviderForm action="edit" provider={data} />;
}
