import { ProductCreate } from '@/app/ui/forms/ProductForm';

export const metadata = {
  title: 'Crear producto'
}
 
export default async function Page() {
  return (
    <section className="flex grow overflow-y-scroll h-0">
      <ProductCreate />
    </section>
  );
}