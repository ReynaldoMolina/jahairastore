import { CategoryForm } from '@/components/forms/category';

export const metadata = {
  title: 'Crear categoría',
};

export default async function Page() {
  return <CategoryForm action="create" />;
}
