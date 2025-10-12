import { EditClientForm } from '@/components/forms/cliente/edit';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getClientById } from '@/fetch-data/client';
import { getMunicipiosSelect } from '@/fetch-data/municipio';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Cliente ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const data = await getClientById(id);
  const municipios = await getMunicipiosSelect();

  return (
    <>
      <Header title={`Cliente ${id}`} />
      <PageWrapper>
        <EditClientForm client={data} selectOptions={{ municipios }} />
      </PageWrapper>
    </>
  );
}
