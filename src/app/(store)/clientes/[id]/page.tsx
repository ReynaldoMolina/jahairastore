import { checkAuthorization } from '@/authorization/check-authorization';
import { EditClientForm } from '@/components/forms/client/edit';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getClientById } from '@/fetch-data/clients';
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

  return (
    <>
      <SiteHeader title={`Cliente ${id}`} />
      <PageWrapper>
        <EditClientForm client={client} />
      </PageWrapper>
    </>
  );
}
