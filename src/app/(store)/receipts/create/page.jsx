import { ReceiptCreate } from '@/app/ui/forms/ReceiptForm';
 
export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <ReceiptCreate searchParams={searchParams} />
  );
}