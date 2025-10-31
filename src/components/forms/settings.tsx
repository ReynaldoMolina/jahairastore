'use client';

import { startTransition, useActionState } from 'react';
import { FormButtons } from './form-inputs/form-inputs';
import { Card, CardContent } from '../ui/card';
import { FieldGroup, FieldSet } from '../ui/field';
import { useForm } from 'react-hook-form';
import { settingsSchema } from './validation/settings';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../form-elements/form-input';
import { FormTextArea } from '../form-elements/form-text-area';
import { SettingsFormType } from '@/types/types';
import { updateSettings } from '@/server-actions/settings';
import { stateDefault } from '@/server-actions/stateMessage';
import { useServerActionFeedback } from '../use-server-status';

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
                label="Nombre"
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
                label="Mensaje"
                description="Este mensaje aparecerá en la página Inicio."
              />
              <FormTextArea
                control={form.control}
                name="porHacer"
                label="Por hacer"
                description="Mejoras, arreglos de errores, etc., puedes escribirlo aquí."
              />
            </FieldSet>
          </FieldGroup>
        </CardContent>
        <FormButtons isNew={false} isPending={isPending} />
      </Card>
    </form>
  );
}
