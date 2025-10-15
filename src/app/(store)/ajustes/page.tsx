import { isDemo } from '@/middleware';
import Link from 'next/link';
import LogoutForm from '@/components/login/logout-form';
import { FormId } from '@/components/forms/form-inputs/form-inputs';
import { ChevronRight, Receipt, Shapes, Store, Users } from 'lucide-react';
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
      <CardHeader>
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
            <FieldDescription>Configuración</FieldDescription>
            <ChangeTheme />
            {!isDemo && <LogoutForm />}
          </FieldSet>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

function SettingsSection({ children, title = '' }) {
  return (
    <section className="flex flex-col gap-2 w-full">
      <h2 className="text-xs font-semibold px-2 opacity-80">{title}</h2>
      {children}
    </section>
  );
}

function SettingsItem({ label, children, href }) {
  return (
    <Link
      href={href}
      className="flex items-center bg-neutral-200 dark:bg-neutral-800 hover:bg-sky-200 dark:hover:bg-neutral-700 rounded-lg p-3 cursor-pointer gap-2 min-h-9 h-full w-full"
    >
      <div className="flex gap-2 w-full items-center">
        {children}
        <label className="text-xs font-bold cursor-pointer">{label}</label>
      </div>
      <ChevronRight className="size-5" />
    </Link>
  );
}
