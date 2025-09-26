export const dynamic = 'force-dynamic';

import { ReceiptForm } from '@/components/forms/ReceiptForm';
import { getClientsSelect } from '@/fetch-data/data';

export const metadata = {
  title: 'Crear recibo',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const selectData = await getClientsSelect();

  return (
    <ReceiptForm
      isNew={true}
      searchParams={searchParams}
      selectData={selectData}
    />
  );
}
