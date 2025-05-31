import { ClientCreate } from '@/app/ui/forms/ClientForm';
 
export const metadata = {
  title: 'Nuevo cliente'
}

export default async function Page() {
  return (
    <ClientCreate />
  );
}