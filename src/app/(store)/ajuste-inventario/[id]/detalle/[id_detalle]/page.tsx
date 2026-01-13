import { checkAuthorization } from '@/authorization/check-authorization';
import { EditDetailDialog } from '@/components/forms/ajuste-inventario/detail/detail';
import {
  getAjusteInventarioDetailById,
  getAjusteInventarioIdUbicacion,
} from '@/fetch-data/ajustes-detail';
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
  const idUbicacion = await getAjusteInventarioIdUbicacion(id);
  const detail = await getAjusteInventarioDetailById(id_detalle, idUbicacion);

  if (!detail) {
    notFound();
  }

  return <EditDetailDialog detail={detail} />;
}
