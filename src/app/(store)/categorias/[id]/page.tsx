import { CategoryForm } from '@/components/forms/category';
import { getCategoryById } from '@/fetch-data/categories';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: PageProps) {
  const { id } = await props.params;

  return {
    title: `Categoría ${id}`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);
  const data = await getCategoryById(id);

  if (!data) {
    notFound();
  }

  return <CategoryForm action="edit" category={data} />;
}
