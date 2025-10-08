export const dynamic = 'force-dynamic';

import { PurchasesForm } from '@/components/forms/purchases';
import { getProvidersSelect } from '@/fetch-data/provider';

export const metadata = {
  title: 'Crear compra',
};

export default async function Page() {
  const providers = await getProvidersSelect();

  return <PurchasesForm action="create" providers={providers} />;
}
