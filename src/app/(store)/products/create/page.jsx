import { ProductCreate } from '@/app/ui/forms/ProductForm';

export const metadata = {
  title: 'Crear producto'
}
 
export default async function Page() {
  return (
    <ProductCreate />
  );
}