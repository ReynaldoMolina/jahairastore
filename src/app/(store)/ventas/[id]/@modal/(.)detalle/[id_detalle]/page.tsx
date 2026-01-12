import { checkAuthorization } from '@/authorization/check-authorization';
import { EditSaleDetailDialog } from '@/components/forms/sale/detail/detail';
import {
  getSaleDetailById,
  getSaleIdUbicacion,
} from '@/fetch-data/sales-detail';
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
  const idUbicacion = await getSaleIdUbicacion(id);
  const detail = await getSaleDetailById(id_detalle, idUbicacion);

  if (!detail) {
    notFound();
  }

  return <EditSaleDetailDialog detail={detail} />;
}
