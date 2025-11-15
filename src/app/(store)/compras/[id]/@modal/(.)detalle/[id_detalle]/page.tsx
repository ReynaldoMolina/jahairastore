import { checkAuthorization } from '@/authorization/check-authorization';
import { EditPurchaseDetailDialog } from '@/components/forms/purchase/detail/detail';
import { getPurchaseDetailById } from '@/fetch-data/purchase-detail';
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
  const detail = await getPurchaseDetailById(id_detalle);

  if (!detail) {
    notFound();
  }

  return <EditPurchaseDetailDialog detail={detail} />;
}
