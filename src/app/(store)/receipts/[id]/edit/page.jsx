import { ReceiptEdit } from '@/app/ui/forms/ReceiptForm';
import { getReceiptById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props) {
  // const customers = await fetchCustomers();
  const params = await props.params;
  const id = params.id;
  const data = await getReceiptById(id);

  if (!data) {
    notFound();
  }
 
  return (
    <ReceiptEdit receipt={data} />
  );
}