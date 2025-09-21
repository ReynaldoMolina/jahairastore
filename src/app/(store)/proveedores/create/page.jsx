import { ProviderForm } from '@/components/forms/ProviderForm';

export const metadata = {
  title: 'Crear proveedor',
};

export default async function Page() {
  return <ProviderForm isNew={true} />;
}
