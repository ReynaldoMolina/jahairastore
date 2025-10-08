import { isDemo } from '@/middleware';
import Link from 'next/link';
import LogoutForm from '@/components/login/logout-form';
import {
  ChevronRight,
  CircleDollarSign,
  MapPin,
  Shapes,
  Store,
  Users,
} from 'lucide-react';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChangeTheme } from '@/components/settings/change-theme';

export function Settings() {
  return (
    <Card className="max-w-2xl mx-auto w-full">
      <CardHeader>
        <CardTitle>Ajustes</CardTitle>
        <CardDescription>
          Configura tu negocio y personaliza la aplicación según tus
          necesidades.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <SettingsSection title="General">
          {!isDemo && (
            <SettingsLink label="Infomación del negocio" href="/ajustes/info">
              <Store />
            </SettingsLink>
          )}
          <SettingsLink
            label="Tipo de cambio y tarifas de envío"
            href="/ajustes/config"
          >
            <CircleDollarSign />
          </SettingsLink>
        </SettingsSection>

        <SettingsSection title="Administrar">
          <SettingsLink label="Categorías" href="/categorias">
            <Shapes />
          </SettingsLink>
          <SettingsLink label="Proveedores" href="/proveedores">
            <Users />
          </SettingsLink>
          <SettingsLink label="Municipios" href="/municipios">
            <MapPin />
          </SettingsLink>
        </SettingsSection>
        <ChangeTheme />
        <Separator />
        {!isDemo && <LogoutForm />}
      </CardContent>
    </Card>
  );
}

interface SettingsSectionProps {
  children: React.ReactNode;
  title: string;
}

export function SettingsSection({
  children,
  title = '',
}: SettingsSectionProps) {
  return (
    <section className="flex flex-col gap-3 w-full">
      <span className="text-sm text-muted-foreground">{title}</span>
      {children}
    </section>
  );
}

interface SettingsItemProps {
  label: string;
  children: React.ReactNode;
  href: string;
}

function SettingsLink({ label, children, href }: SettingsItemProps) {
  return (
    <Button variant="secondary" asChild>
      <Link href={href} className="flex gap-2 w-full items-center">
        <div className="inline-flex gap-2 items-center">
          {children}
          {label}
        </div>
        <ChevronRight className="ml-auto" />
      </Link>
    </Button>
  );
}
