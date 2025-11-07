import { isDemo } from '@/middleware';
import Link from 'next/link';
import LogoutForm from '@/components/login/logout-form';
import { ChevronRightIcon, Shapes, Store, Users } from 'lucide-react';
import { ChangeTheme } from '@/components/change-theme';
import { Card, CardContent } from '@/components/ui/card';
import { FieldDescription, FieldGroup, FieldSet } from '@/components/ui/field';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { SiteHeader } from '@/components/site-header';
import { PageWrapper } from '@/components/page-wrapper';
import { checkAuthorization } from '@/authorization/check-authorization';

export const metadata = {
  title: 'Ajustes',
};

export default async function Page() {
  await checkAuthorization();

  return (
    <>
      <SiteHeader title="Ajustes" />
      <PageWrapper>
        <Card className="mx-auto w-full max-w-xl">
          <CardContent>
            <FieldGroup>
              <FieldSet className="gap-3">
                {!isDemo && (
                  <Item asChild variant="outline">
                    <Link href="/ajustes/info">
                      <ItemMedia variant="icon">
                        <Store />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>Información del negocio</ItemTitle>
                        <ItemDescription>
                          Actualiza los datos de tu negocio.
                        </ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <ChevronRightIcon className="size-4" />
                      </ItemActions>
                    </Link>
                  </Item>
                )}
                {/* <Item asChild variant="outline">
                  <Link href="/categorias">
                    <ItemMedia variant="icon">
                      <Shapes />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Categorías</ItemTitle>
                      <ItemDescription>
                        Administra las categorías de los productos.
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <ChevronRightIcon className="size-4" />
                    </ItemActions>
                  </Link>
                </Item> */}
                <Item asChild variant="outline">
                  <Link href="/proveedores">
                    <ItemMedia variant="icon">
                      <Users />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Proveedores</ItemTitle>
                      <ItemDescription>
                        Administra los proveedores de tus productos.
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <ChevronRightIcon className="size-4" />
                    </ItemActions>
                  </Link>
                </Item>
              </FieldSet>
              <FieldSet className="gap-3">
                <FieldDescription>Tema</FieldDescription>
                <ChangeTheme />
              </FieldSet>
              {!isDemo && <LogoutForm />}
            </FieldGroup>
          </CardContent>
        </Card>
      </PageWrapper>
    </>
  );
}
