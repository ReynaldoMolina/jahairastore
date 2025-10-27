import { checkAuthorization } from '@/authorization/check-authorization';
import { ProviderForm } from '@/components/forms/provider';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getProviderById } from '@/fetch-data/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Proveedor ${id}`,
  };
}

export default async function Page(props) {
  await checkAuthorization();

  const params = await props.params;
  const id = params.id;
  const data = await getProviderById(id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title={`Proveedor ${id}`} />
      <PageWrapper>
        <ProviderForm isNew={false} provider={data} />;
      </PageWrapper>
    </>
  );
}
