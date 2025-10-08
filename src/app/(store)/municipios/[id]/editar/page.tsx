import { EditMunicipioForm } from '@/components/forms/municipio/edit';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getMunicipioById } from '@/fetch-data/municipio';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Municipio ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  if (!id) notFound();

  const data = await getMunicipioById(id);

  return (
    <>
      <Header title={`Municipio ${id}`} />
      <PageWrapper>
        <EditMunicipioForm municipio={data} />
      </PageWrapper>
    </>
  );
}
