import { checkAuthorization } from '@/authorization/check-authorization';
import { EditPurchaseDetailDialog } from '@/components/forms/purchase/detail/detail';
import {
  getPurchaseDetailById,
  getPurchaseIdUbicacion,
} from '@/fetch-data/purchase-detail';
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
  const idUbicacion = await getPurchaseIdUbicacion(id);
  const detail = await getPurchaseDetailById(id_detalle, idUbicacion);

  if (!detail) {
    notFound();
  }

  return <EditPurchaseDetailDialog detail={detail} />;
}
