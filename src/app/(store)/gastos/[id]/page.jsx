export const dynamic = 'force-dynamic';

import { ExpenseForm } from '@/app/ui/forms/ExpenseForm';
import { getExpenseById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { getProvidersSelect } from '@/app/lib/data';

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

  return <ExpenseForm expense={expense} selectData={selectData} />;
}
