import { CategoryCreate } from '@/app/ui/forms/CategoryForm';

export const metadata = {
  title: 'Nueva categoría'
}
 
export default async function Page() {
  return (
    <CategoryCreate />
  );
}