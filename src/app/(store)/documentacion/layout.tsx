import { MenuButton } from '@/components/documentation/menu-button';
import { TypographyH1 } from '@/components/documentation/typography';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';

export default async function Layout({ children }) {
  return (
    <>
      <SiteHeader title="Documentación" hideBackButton />

      <PageWrapper>
        <div className="max-w-2xl mx-auto mb-10 w-full">
          <div className="flex flex-col gap-2 my-3">
            <span className="text-sm text-muted-foreground border-b pb-1">
              Menú
            </span>
            <MenuButton title="Opciones de pago" href="/documentacion" />
            <MenuButton
              title="Políticas de pedidos de Shein"
              href="/documentacion/politica-pedidos-shein"
            />
            <MenuButton
              title="Políticas de envío"
              href="/documentacion/politicas-envios"
            />
            <MenuButton
              title="Políticas de crédito"
              href="/documentacion/politicas-credito"
            />
            <MenuButton
              title="Políticas de recibimiento de productos"
              href="/documentacion/politicas-proveedores"
            />
          </div>
          {children}
        </div>
      </PageWrapper>
    </>
  );
}
