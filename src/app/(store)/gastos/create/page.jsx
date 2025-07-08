import { ExpenseForm } from '@/app/ui/forms/ExpenseForm';
import { getProvidersSelect } from '@/app/lib/data';

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
