import { ProviderCreate } from '@/app/ui/forms/ProviderForm';

export const metadata = {
  title: 'Crear proveedor'
}
 
export default async function Page() {
  return (
    <ProviderCreate />
  );
}