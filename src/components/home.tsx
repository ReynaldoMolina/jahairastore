import { isDemo } from '@/middleware';
import Link from 'next/link';
import Logo from '@/components/icons/logo.svg';
import { SettingsFormType } from '@/types/types';
import { Button } from './ui/button';
import { Coins, ShoppingBag } from 'lucide-react';

export function Home({ businessInfo }: { businessInfo: SettingsFormType }) {
  return (
    <main className="m-auto p-5 grid md:grid-cols-2 gap-5">
      {/* Text section */}
      <div className="flex flex-col items-center md:justify-center md:items-start gap-5 order-2 md:order-1">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-sky-500 bg-clip-text text-transparent">
          {businessInfo.nombreEmpresa}
        </h1>
        <p className="text-xs text-muted-foreground">{businessInfo.eslogan}</p>
        <p className="text-xs text-muted-foreground">
          {isDemo ? 'DEMO' : businessInfo.mensaje || '¡Bienvenido!'}
        </p>

        {/* CTA Button */}
        <div className="inline-flex gap-3">
          <Button asChild type="button">
            <Link href="/ventas/create">
              <Coins />
              Crear venta
            </Link>
          </Button>
          <Button asChild type="button" variant="secondary">
            <Link href="/pedidos/create">
              <ShoppingBag />
              Crear pedido
            </Link>
          </Button>
        </div>
      </div>

      {/* Logo section */}
      <div className="flex justify-center order-1 md:order-2">
        <div className="bg-muted rounded-full p-7">
          <Logo className="size-30" />
        </div>
      </div>
    </main>
  );
}
