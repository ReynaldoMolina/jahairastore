import { ClientForm } from '@/components/forms/ClientForm';

export const metadata = {
  title: 'Crear cliente',
};

export default async function Page() {
  return <ClientForm isNew={true} />;
}
