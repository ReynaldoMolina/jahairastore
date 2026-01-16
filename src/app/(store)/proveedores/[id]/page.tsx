import { checkAuthorization } from '@/authorization/check-authorization';
import { EditProviderForm } from '@/components/form/provider/edit';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getProviderById } from '@/fetch-data/provider';
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

  return (
    <>
      <SiteHeader title={`Proveedor ${id}`} />
      <PageWrapper>
        <EditProviderForm provider={provider} />
      </PageWrapper>
    </>
  );
}
