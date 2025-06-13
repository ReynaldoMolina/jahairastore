import { ClientCreate } from '@/app/ui/forms/ClientForm';
import Header from '@/app/ui/header/Header';
 
export const metadata = {
  title: 'Crear cliente'
}

export default async function Page() {
  return (
    <ClientCreate />
  );
}