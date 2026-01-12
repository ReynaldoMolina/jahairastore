import { checkAuthorization } from '@/authorization/check-authorization';
import { EditDetailDialog } from '@/components/forms/traslado/detail/detail';
import {
  getTrasladoDetailById,
  getTrasladoIdUbicacion,
} from '@/fetch-data/traslados-detail';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id_detalle } = await params;

  return {
    title: `Detalle ${id_detalle}`,
  };
}

export default async function Page({ params }: PageProps) {
  await checkAuthorization();

  const { id, id_detalle } = await params;
  const idUbicacion = await getTrasladoIdUbicacion(id);
  const detail = await getTrasladoDetailById(id_detalle, idUbicacion);

  if (!detail) {
    notFound();
  }

  return <EditDetailDialog detail={detail} />;
}
