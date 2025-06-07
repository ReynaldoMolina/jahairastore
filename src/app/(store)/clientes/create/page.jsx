import { ClientCreate } from '@/app/ui/forms/ClientForm';
 
export const metadata = {
  title: 'Crear cliente'
}

export default async function Page() {
  return (
    <ClientCreate />
  );
}