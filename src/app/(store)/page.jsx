export const dynamic = 'force-dynamic';

import Logo from '@/app/ui/icons/logo.svg';
import { getBusinessInfo } from '../lib/data';

export default async function Page() {
  const data = await getBusinessInfo(1);

  return (
    <section className="flex flex-col justify-center items-center grow">
      <Logo className="size-40" />
      <div className="flex flex-col gap-3">
        <h1 className="text-center text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500">
          {data.Eslogan}
        </h1>
        {data.Mensaje && (
          <h2 className="text-center text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500">
            {data.Mensaje}
          </h2>
        )}
      </div>
    </section>
  );
}
