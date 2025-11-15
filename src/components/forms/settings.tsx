'use client';

import { startTransition, useActionState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '../ui/field';
import { useForm } from 'react-hook-form';
import { settingsSchema } from './validation/settings';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../form-elements/form-input';
import { FormTextArea } from '../form-elements/form-text-area';
import { SettingsFormType } from '@/types/types';
import { updateSettings } from '@/server-actions/settings';
import { stateDefault } from '@/server-actions/stateMessage';
import { useServerActionFeedback } from '../../hooks/use-server-status';
import { FormCardFooter } from '../form-elements/form-footer';
import { ChangeTheme } from '../change-theme';
import LogoutForm from './login/logout-form';
import { isDemo } from '@/middleware';

interface SettingsForm {
  data: SettingsFormType;
}

export function SettingsForm({ data }: SettingsForm) {
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      nombreEmpresa: data.nombreEmpresa,
      eslogan: data.eslogan,
      mensaje: data.mensaje ?? '',
      porHacer: data.porHacer,
      cambioDolar: data.cambioDolar,
      envioMaritimo: data.envioMaritimo,
      envioAereo: data.envioAereo,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateSettings,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof settingsSchema>) {
    startTransition(() => {
      formAction({ values: values as SettingsFormType });
    });
  }

  useServerActionFeedback(state);

  return (
    <div className="space-y-6">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl w-full mx-auto"
      >
        <Card>
          <CardContent>
            <FieldGroup>
              <FieldSet>
                <FormInput
                  control={form.control}
                  name="nombreEmpresa"
                  label="Nombre del negocio"
                />
                <FormInput
                  control={form.control}
                  name="eslogan"
                  label="Eslogan"
                  description="Aparecerá también en los recibos."
                />
                <FormInput
                  control={form.control}
                  name="mensaje"
                  label="Mensaje motivacional"
                  description="Aparecerá en la página de Inicio."
                />
                <FormTextArea
                  control={form.control}
                  name="porHacer"
                  label="Por hacer"
                  description="Mejoras, arreglos de errores, etc., puedes escribirlos aquí."
                />
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend className="data-[variant=legend]:text-sm font-semibold">
                  Precios de envío
                </FieldLegend>
                <FieldDescription>
                  Se aplicarán solo a los nuevos registros.
                </FieldDescription>
                <FormInput
                  control={form.control}
                  name="cambioDolar"
                  label="Cambio USD"
                  textAddon="C$"
                />
                <div className="inline-flex gap-6">
                  <FormInput
                    control={form.control}
                    name="envioMaritimo"
                    label="Envío marítimo"
                    textAddon="$"
                  />
                  <FormInput
                    control={form.control}
                    name="envioAereo"
                    label="Envío aéreo"
                    textAddon="$"
                  />
                </div>
              </FieldSet>
              <FieldSet className="gap-3">
                <FieldDescription>Tema</FieldDescription>
                <ChangeTheme />
              </FieldSet>
            </FieldGroup>
          </CardContent>
          <FormCardFooter isPending={isPending} />
        </Card>
      </form>
      {!isDemo && (
        <Card className="max-w-xl w-full mx-auto">
          <CardContent>
            <LogoutForm />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
