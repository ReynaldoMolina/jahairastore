export const dynamic = 'force-dynamic';

import { ExpenseForm } from '@/components/forms/expense';
import { getExpenseById, getProvidersSelect } from '@/fetch-data/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Gasto ${id}`,
  };
}

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const expense = await getExpenseById(id);
  const selectData = await getProvidersSelect();

  if (!expense) {
    notFound();
  }

  return (
    <ExpenseForm isNew={false} expense={expense} selectData={selectData} />
  );
}
