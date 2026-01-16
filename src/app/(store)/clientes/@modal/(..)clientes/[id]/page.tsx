import { checkAuthorization } from '@/authorization/check-authorization';
import { EditClientFormDialog } from '@/components/form/client/edit-dialog';
import { getClientById } from '@/fetch-data/client';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Cliente ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  return <EditClientFormDialog client={client} />;
}
