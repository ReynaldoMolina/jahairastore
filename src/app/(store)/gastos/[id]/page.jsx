import { ExpenseEdit } from '@/app/ui/forms/ExpenseForm';
import { getExpenseById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Gasto ${id}`
  }
}
 
export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const expense = await getExpenseById(id);

  if (!expense) {
    notFound();
  }
 
  return (
    <ExpenseEdit expense={expense} />
  );
}