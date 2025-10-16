import { isDemo } from '@/middleware';
import Link from 'next/link';
import LogoutForm from '@/components/login/logout-form';
import { ChevronRight, Shapes, Store, Users } from 'lucide-react';
import { ChangeTheme } from '@/components/change-theme';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FieldDescription, FieldGroup, FieldSet } from '@/components/ui/field';

export const metadata = {
  title: 'Ajustes',
};

export default async function Page() {
  return (
    <Card className="m-auto w-full max-w-xl">
      <CardHeader className="border-b">
        <CardTitle>Ajustes</CardTitle>
        <CardDescription>Realiza ajustes en tu aplicación</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          {!isDemo && (
            <FieldSet>
              <FieldDescription>General</FieldDescription>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/ajustes/info">
                  <div className="inline-flex items-center gap-3">
                    <Store />
                    Información del negocio
                  </div>
                  <ChevronRight className="ml-auto" />
                </Link>
              </Button>
            </FieldSet>
          )}
          <FieldSet>
            <FieldDescription>Administrar</FieldDescription>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/categorias">
                <div className="inline-flex items-center gap-3">
                  <Shapes />
                  Categorías
                </div>
                <ChevronRight className="ml-auto" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/proveedores">
                <div className="inline-flex items-center gap-3">
                  <Users />
                  Proveedores
                </div>
                <ChevronRight className="ml-auto" />
              </Link>
            </Button>
          </FieldSet>
          <FieldSet>
            <FieldDescription>Tema</FieldDescription>
            <ChangeTheme />
            {!isDemo && <LogoutForm />}
          </FieldSet>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
