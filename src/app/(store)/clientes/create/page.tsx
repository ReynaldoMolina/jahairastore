import { ClientForm } from '@/components/forms/client';

export const metadata = {
  title: 'Crear cliente',
};

export default async function Page() {
  return <ClientForm isNew={true} />;
}
