import { ReceiptForm } from '@/app/ui/forms/ReceiptForm';
import { getClientsSelect } from '@/app/lib/data';

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
