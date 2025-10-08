export const dynamic = 'force-dynamic';

import { PurchasesForm } from '@/components/forms/purchases';
import { getProductsPurchasesModal } from '@/fetch-data/product';
import { getProvidersSelect } from '@/fetch-data/provider';
import { getPurchaseById } from '@/fetch-data/purchase';
import { getPurchaseDetailsById } from '@/fetch-data/purchase-detail';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Compra ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const purchase = await getPurchaseById(Number(id));
  const purchasedetail = await getPurchaseDetailsById(Number(id));
  const providers = await getProvidersSelect();
  const products = (await getProductsPurchasesModal()) ?? [];

  return (
    <PurchasesForm
      action="edit"
      purchase={purchase}
      purchasedetail={purchasedetail}
      providers={providers}
      products={products}
    />
  );
}
