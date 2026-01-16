import { checkAuthorization } from '@/authorization/check-authorization';
import { EditOrderDetailDialog } from '@/components/form/order/detail/edit';
import { getOrderDetailById } from '@/fetch-data/order-detail';
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
  const detail = await getOrderDetailById(id_detalle);

  if (!detail) {
    notFound();
  }

  return <EditOrderDetailDialog detail={detail} />;
}
