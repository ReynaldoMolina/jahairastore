import { checkAuthorization } from '@/authorization/check-authorization';
import { Documentacion } from '@/components/documentacion/documentacion';
import { isDemo } from '@/middleware';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Documentación',
};

export default async function Page() {
  await checkAuthorization();

  if (isDemo) return notFound();

  return <Documentacion />;
}
