import { ProviderCreate } from '@/app/ui/forms/ProviderForm';

export const metadata = {
  title: 'Nuevo proveedor'
}
 
export default async function Page() {
  return (
    <ProviderCreate />
  );
}