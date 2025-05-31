import { WebsiteProductCreate } from '@/app/ui/forms/WebsiteProductsForm';

export const metadata = {
  title: 'Editar producto'
}
 
export default async function Page() {
  return (
    <WebsiteProductCreate />
  );
}