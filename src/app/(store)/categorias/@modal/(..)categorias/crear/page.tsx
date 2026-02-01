import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateCategoryFormDialog } from '@/components/form/product-category/create-dialog';

export const metadata = {
  title: 'Crear categoría',
};

export default async function Page() {
  await checkAuthorization();

  return <CreateCategoryFormDialog />;
}
