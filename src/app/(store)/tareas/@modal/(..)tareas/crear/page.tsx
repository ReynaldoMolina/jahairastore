import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateTareaFormDialog } from '@/components/form/tareas/create-dialog';

export const metadata = {
  title: 'Crear tarea',
};

export default async function Page() {
  await checkAuthorization();

  return <CreateTareaFormDialog />;
}
