import { CategoryForm } from '@/components/forms/CategoryForm';

export const metadata = {
  title: 'Crear categoría',
};

export default async function Page() {
  return <CategoryForm isNew={true} />;
}
