import { OrderCreate } from '@/app/ui/forms/OrderForm';
 
export default async function Page(props) {
  const searchParams = await props.searchParams;
  
  return (
    <OrderCreate searchParams={searchParams} />
  );
}