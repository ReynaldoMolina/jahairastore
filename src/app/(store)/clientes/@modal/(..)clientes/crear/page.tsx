import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateClientFormDialog } from '@/components/form/client/create-dialog';

export const metadata = {
  title: 'Crear cliente',
};

export default async function Page() {
  await checkAuthorization();

  return <CreateClientFormDialog />;
}
