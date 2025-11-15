export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { CreateProductFormDialog } from '@/components/forms/product/create-dialog';
import { getSettingsCambioDolar } from '@/fetch-data/settings';

export const metadata = {
  title: 'Crear producto',
};

export default async function Page() {
  await checkAuthorization();

  const cambioDolar = await getSettingsCambioDolar();

  return <CreateProductFormDialog cambioDolar={cambioDolar} />;
}
