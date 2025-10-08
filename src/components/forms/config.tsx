'use client';

import { startTransition, useActionState } from 'react';
import { FormButtons, FormError } from './form-inputs/form-inputs';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { FormInput } from './form-inputs/form-input';
import { ConfigType } from '@/types/types';
import { configSchema } from './validation/validation-schemas';
import { updateConfig } from '@/server-actions/config';
import { FormInputGroup } from './form-inputs/form-input-group';

interface ConfigFormProps {
  config: ConfigType;
}

export function ConfigForm({ config }: ConfigFormProps) {
  const form = useForm<z.infer<typeof configSchema>>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      id_negocio: config.id_negocio ?? 1,
      cambio_dolar: config.cambio_dolar ?? 0,
      envio_aereo: config.envio_aereo ?? 0,
      envio_mar: config.envio_mar ?? 0,
    },
  });

  const [state, formAction, isPending] = useActionState(updateConfig, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof configSchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  return (
    <main className="flex flex-col gap-4 items-center">
      <Form {...form}>
        <Card className="w-full mx-auto max-w-2xl">
          <CardHeader className="border-b">
            <CardTitle>Tasa de cambio y tarifas de envío</CardTitle>
            <CardDescription>
              Edita la configuración, haz click en guardar cuando estés listo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormInput
                control={form.control}
                name="id_negocio"
                label="Id negocio"
                disabled
                hidden
              />
              <FormInput
                control={form.control}
                name="cambio_dolar"
                label="Cambio dólar"
              />
              <FormInputGroup>
                <FormInput
                  control={form.control}
                  name="envio_aereo"
                  label="Envío aéreo (dólares x libra)"
                />
                <FormInput
                  control={form.control}
                  name="envio_mar"
                  label="Envío marítimo (dólares x libra)"
                />
              </FormInputGroup>
              <FormError isPending={isPending} state={state} />
              <FormButtons action="edit" isPending={isPending} />
            </form>
          </CardContent>
        </Card>
      </Form>
    </main>
  );
}
