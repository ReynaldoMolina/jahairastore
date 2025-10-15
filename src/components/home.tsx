import { isDemo } from '@/middleware';
import Link from 'next/link';
import Logo from '@/components/icons/logo.svg';

export function Home({ businessInfo }) {
  return (
    <main className="flex justify-center items-center w-full grow p-5">
      <section className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-4 w-full max-w-5xl">
        {/* Text section */}
        <div className="flex flex-col items-center md:items-start md:w-[60%] text-center md:text-left gap-5 order-2 md:order-1">
          <h1 className="w-full text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-sky-500 bg-clip-text text-transparent">
            {businessInfo.Nombre_empresa}
          </h1>
          <h2 className="w-full text-lg md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-sky-400">
            {businessInfo.Eslogan}
          </h2>
          <h3 className="w-full text-sm md:text-base font-medium text-emerald-500">
            {isDemo ? 'DEMO' : businessInfo.Mensaje || '¡Bienvenido!'}
          </h3>

          {/* CTA Button */}
          <Link
            href="/ventas/create"
            className="mt-5 px-6 py-3 w-fit bg-gradient-to-r from-purple-600 to-sky-500 text-white font-semibold rounded-full shadow hover:scale-105 transition"
          >
            Crear venta
          </Link>
        </div>
        {/* Logo section */}
        <div className="md:w-[40%] flex justify-center order-1 md:order-2">
          <div className="bg-white dark:bg-neutral-800 rounded-full p-6">
            <Logo className="size-32 md:size-40" />
          </div>
        </div>
      </section>
    </main>
  );
}
