import { checkAuthorization } from '@/authorization/check-authorization';
import { EditProviderFormDialog } from '@/components/forms/provider/edit-dialog';
import { getProviderById } from '@/fetch-data/providers';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Proveedor ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const provider = await getProviderById(id);

  if (!provider) {
    notFound();
  }

  return <EditProviderFormDialog provider={provider} />;
}
