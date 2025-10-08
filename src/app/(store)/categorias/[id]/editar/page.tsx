import { EditCategoriaForm } from '@/components/forms/categoria/edit';
import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getCategoryById } from '@/fetch-data/category';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Categoría ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const data = await getCategoryById(id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Header title={`Categoría ${id}`} />
      <PageWrapper>
        <EditCategoriaForm category={data} />
      </PageWrapper>
    </>
  );
}
