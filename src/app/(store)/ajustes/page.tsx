import { isDemo } from '@/middleware';
import Link from 'next/link';
import LogoutForm from '@/components/login/logout-form';
import {
  ChevronRight,
  ChevronRightIcon,
  Shapes,
  Store,
  Users,
} from 'lucide-react';
import { ChangeTheme } from '@/components/change-theme';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FieldDescription,
  FieldGroup,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';

export const metadata = {
  title: 'Ajustes',
};

export default async function Page() {
  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader className="border-b">
        <CardTitle>Ajustes</CardTitle>
        <CardDescription>Realiza ajustes en tu aplicación</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          {!isDemo && (
            <>
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
            </>
          )}
          <FieldSet>
            <Item asChild variant="outline">
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
            </Item>
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
          <FieldSeparator />
          <FieldSet>
            <FieldDescription>Tema</FieldDescription>
            <ChangeTheme />
          </FieldSet>
          <FieldSeparator />
          {!isDemo && <LogoutForm />}
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
