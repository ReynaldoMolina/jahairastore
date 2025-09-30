import { ClientForm } from '@/components/forms/client';

export const metadata = {
  title: 'Nuevo cliente',
};

export default async function Page() {
  return <ClientForm action="create" />;
}
