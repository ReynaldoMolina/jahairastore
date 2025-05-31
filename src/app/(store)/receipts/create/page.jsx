import { ReceiptCreate } from '@/app/ui/forms/ReceiptForm';

export const metadata = {
  title: 'Nuevo recibo'
}
 
export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <ReceiptCreate searchParams={searchParams} />
  );
}