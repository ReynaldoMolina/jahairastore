import { ExpenseCreate } from '@/app/ui/forms/ExpenseForm';

export const metadata = {
  title: 'Crear gasto'
}
 
export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <ExpenseCreate searchParams={searchParams} />
  );
}