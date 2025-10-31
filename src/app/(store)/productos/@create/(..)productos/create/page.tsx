export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateProductFormDialog } from '@/components/forms/product/create-dialog';

export const metadata = {
  title: 'Crear producto',
};

export default async function Page() {
  await checkAuthorization();

  return <CreateProductFormDialog />;
}
