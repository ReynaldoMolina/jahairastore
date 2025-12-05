import { checkAuthorization } from '@/authorization/check-authorization';
import { EditTareaFormDialog } from '@/components/forms/tareas/edit-dialog';
import { getTareaById } from '@/fetch-data/tareas';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Tarea ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const tarea = await getTareaById(id);

  if (!tarea) {
    notFound();
  }

  return <EditTareaFormDialog tarea={tarea} />;
}
