import { isDemo } from '@/middleware';
import Link from 'next/link';
import Logo from '@/components/icons/logo.svg';
import { SettingsFormType } from '@/types/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';
import { Coins, ShoppingBag } from 'lucide-react';

export function Home({ businessInfo }: { businessInfo: SettingsFormType }) {
  return (
    <main className="flex justify-center items-center w-full grow p-5">
      <section className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-4 w-full max-w-3xl">
        {/* Text section */}
        <div className="flex flex-col items-center md:items-start md:w-[60%] text-center md:text-left gap-5 order-2 md:order-1">
          <h1 className="w-full text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-sky-500 bg-clip-text text-transparent">
            {businessInfo.nombreEmpresa}
          </h1>
          <p className="w-full text-sm font-semibold">{businessInfo.eslogan}</p>
          <p className="w-full text-sm text-muted-foreground">
            {isDemo ? 'DEMO' : businessInfo.mensaje || '¡Bienvenido!'}
          </p>

          {/* CTA Button */}
          <div className="inline-flex gap-3 flex-col sm:flex-row">
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
          {!isDemo && (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Ver lista de cosas por arreglar
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p className="whitespace-pre-line text-muted-foreground">
                    {businessInfo.porHacer ?? ''}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
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
