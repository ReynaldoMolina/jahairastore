import { isDemo } from '@/middleware';
import Logo from '@/app/ui/icons/logo.svg';

export function BusinessInfo({ businessInfo }) {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center bg-white dark:bg-neutral-900 p-10 rounded-lg gap-2 md:gap-5 w-full md:max-w-3xl">
      <div className="flex justify-center order-1 md:order-2 md:w-[40%]">
        <div className="md:bg-neutral-100 md:dark:bg-neutral-800 md:rounded-full overflow-hidden md:p-6">
          <Logo className="size-35" />
        </div>
      </div>
      <div className="flex flex-col order-1 gap-3 md:w-[60%]">
        <h1 className="text-center text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500 md:text-left">
          {businessInfo.Eslogan}
        </h1>
        <h2 className="text-center text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500 md:text-left">
          {isDemo ? 'DEMO' : businessInfo.Mensaje || '¡Bienvenido!'}
        </h2>
      </div>
    </section>
  );
}
