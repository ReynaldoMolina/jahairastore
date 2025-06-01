import { WebsiteProductCreate } from '@/app/ui/forms/WebsiteProductsForm';

export const metadata = {
  title: 'Crear producto'
}
 
export default async function Page() {
  return (
    <WebsiteProductCreate />
  );
}