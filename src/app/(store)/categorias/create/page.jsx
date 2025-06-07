import { CategoryCreate } from '@/app/ui/forms/CategoryForm';

export const metadata = {
  title: 'Crear categoría'
}
 
export default async function Page() {
  return (
    <CategoryCreate />
  );
}