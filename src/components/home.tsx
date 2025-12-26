import { isDemo } from '@/middleware';
import Logo from '@/components/icons/logo.svg';
import { BusinessInfoType } from '@/types/types';

export function Home({ businessInfo }: { businessInfo: BusinessInfoType }) {
  return (
    <main className="flex flex-col items-center m-auto gap-6 max-w-lg">
      <div className="bg-muted rounded-full p-5 aspect-square flex items-center justify-center max-h-40 max-w-40">
        <Logo className="size-30" />
      </div>

      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-sky-500 bg-clip-text text-transparent text-center">
          {businessInfo.nombreEmpresa}
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          {`"${businessInfo.eslogan}"`}
        </p>
        <blockquote className="border-l-2 pl-3 italic text-sm text-muted-foreground text-center max-w-xl">
          {isDemo ? 'DEMO' : businessInfo.mensaje || '¡Bienvenido!'}
        </blockquote>
      </div>
    </main>
  );
}
