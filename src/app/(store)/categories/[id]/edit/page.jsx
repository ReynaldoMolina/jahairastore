import { CategoryEdit } from '@/app/ui/forms/CategoryForm';
import { getCategoryById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Editar categoría'
}
 
export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const data = await getCategoryById(id);

  if (!data) {
    notFound();
  }
 
  return (
    <CategoryEdit category={data} />
  );
}