'use client';

import { startTransition, useActionState, useEffect } from 'react';
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
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '../ui/field';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { stateDefault } from '@/server-actions/state-messages';

interface ConfigFormProps {
  config: ConfigType;
}

export function ConfigForm({ config }: ConfigFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof configSchema>>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      id_negocio: config.id_negocio ?? 1,
      cambio_dolar: config.cambio_dolar ?? 0,
      envio_aereo: config.envio_aereo ?? 0,
      envio_mar: config.envio_mar ?? 0,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateConfig,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof configSchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  useEffect(() => {
    if (state.success) {
      toast(state.title, {
        description: state.description,
      });
    }
  }, [state]);

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
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Tasa de cambio</FieldLegend>
                  <FieldDescription>
                    Actualiza la tasa de cambio que se aplicará a las nuevas
                    transacciones.
                  </FieldDescription>
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
                    label="Cambio del dólar"
                  />
                </FieldSet>
                <FieldSeparator />
                <FieldSet>
                  <FieldLegend>Tarifas de envío</FieldLegend>
                  <FieldDescription>
                    Se aplicarán al envío de los nuevos pedidos, el valor es en
                    dólares por cada libra.
                  </FieldDescription>
                  <FormInput
                    control={form.control}
                    name="envio_aereo"
                    label="Envío aéreo"
                  />
                  <FormInput
                    control={form.control}
                    name="envio_mar"
                    label="Envío marítimo"
                  />
                </FieldSet>
              </FieldGroup>
              <FormButtons action="edit" isPending={isPending} />
            </form>
          </CardContent>
        </Card>
      </Form>
    </main>
  );
}
