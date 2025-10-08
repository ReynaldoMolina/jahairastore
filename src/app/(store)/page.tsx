export const dynamic = 'force-dynamic';

import { Home } from '@/components/home';
import { getNegocio } from '@/fetch-data/negocio';

export default async function Page() {
  const negocio = await getNegocio();
  return <Home negocio={negocio} />;
}
