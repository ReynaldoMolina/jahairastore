import { CategoryForm } from '@/components/forms/category';
import { getCategoryById } from '@/fetch-data/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Categoría ${id}`,
  };
}

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const data = await getCategoryById(id);

  if (!data) {
    notFound();
  }

  return <CategoryForm isNew={false} category={data} />;
}
