import { checkAuthorization } from '@/authorization/check-authorization';
import { ClientForm } from '@/components/forms/client';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getClientById } from '@/fetch-data/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Cliente ${id}`,
  };
}

export default async function Page(props) {
  await checkAuthorization();

  const params = await props.params;
  const id = params.id;
  const data = await getClientById(id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title={`Cliente ${id}`} />
      <PageWrapper>
        <ClientForm isNew={false} client={data} />
      </PageWrapper>
    </>
  );
}
