import { checkAuthorization } from '@/authorization/check-authorization';
import { EditSaleDetailDialog } from '@/components/forms/sale/detail/detail';
import { getSaleDetailById } from '@/fetch-data/sales-detail';
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

  const { id_detalle } = await params;
  const detail = await getSaleDetailById(id_detalle);

  if (!detail) {
    notFound();
  }

  return <EditSaleDetailDialog detail={detail} />;
}
