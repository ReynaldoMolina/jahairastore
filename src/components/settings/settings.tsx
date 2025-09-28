import { isDemo } from '@/middleware';
import Link from 'next/link';
import LogoutForm from '@/components/login/logout-form';
import { ChevronRight, Shapes, Store, Users } from 'lucide-react';
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
    <Card className="max-w-xl mx-auto w-full">
      <CardHeader>
        <CardTitle>Ajustes</CardTitle>
        <CardDescription>Realiza ajustes en la app</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {!isDemo && (
          <SettingsLink label="Infomación del negocio" href="/ajustes/info">
            <Store className="size-5" />
          </SettingsLink>
        )}
        <SettingsSection title="Administrar">
          <SettingsLink label="Categorías" href="/categorias">
            <Shapes className="size-5" />
          </SettingsLink>
          <SettingsLink label="Proveedores" href="/proveedores">
            <Users className="size-5" />
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
