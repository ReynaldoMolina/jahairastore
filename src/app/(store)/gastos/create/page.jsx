export const dynamic = 'force-dynamic';

import { ExpenseForm } from '@/components/forms/ExpenseForm';
import { getProvidersSelect } from '@/fetch-data/data';

export const metadata = {
  title: 'Crear gasto',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const selectData = await getProvidersSelect();

  return (
    <ExpenseForm
      isNew={true}
      searchParams={searchParams}
      selectData={selectData}
    />
  );
}
