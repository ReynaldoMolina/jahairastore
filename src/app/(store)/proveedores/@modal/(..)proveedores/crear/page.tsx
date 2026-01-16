import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateProviderFormDialog } from '@/components/form/provider/create-dialog';

export const metadata = {
  title: 'Crear proveedor',
};

export default async function Page() {
  await checkAuthorization();

  return <CreateProviderFormDialog />;
}
