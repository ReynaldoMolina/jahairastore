import { isDemo } from '@/middleware';
import Logo from '@/components/icons/logo.svg';
import { BusinessInfoType } from '@/types/types';

export function Home({ businessInfo }: { businessInfo: BusinessInfoType }) {
  return (
    <main className="m-auto grid lg:grid-cols-2 gap-5 max-w-lg lg:max-w-2xl">
      {/* Text */}
      <div className="flex flex-col items-center md:justify-center lg:items-start gap-5 order-2 lg:order-1">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-sky-500 bg-clip-text text-transparent text-center md:text-left">
          {businessInfo.nombreEmpresa}
        </h1>
        <p className="text-sm text-muted-foreground text-center md:text-left">
          {`"${businessInfo.eslogan}"`}
        </p>
        <blockquote className="border-l-2 pl-3 italic text-sm text-muted-foreground text-center lg:text-left max-w-xl">
          {isDemo ? 'DEMO' : businessInfo.mensaje || '¡Bienvenido!'}
        </blockquote>
      </div>

      {/* Logo */}
      <div className="flex justify-center items-center order-1 lg:order-2 lg:max-w-lg">
        <div className="bg-muted rounded-full p-5 aspect-square flex items-center justify-center max-h-50 max-w-50">
          <Logo className="size-30" />
        </div>
      </div>
    </main>
  );
}
