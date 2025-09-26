import { ProviderForm } from '@/components/forms/ProviderForm';
import { getProviderById } from '@/fetch-data/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Proveedor ${id}`,
  };
}

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const data = await getProviderById(id);

  if (!data) {
    notFound();
  }

  return <ProviderForm isNew={false} provider={data} />;
}
