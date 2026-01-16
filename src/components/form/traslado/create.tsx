'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { TrasladoFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { Form } from '@/components/ui/form';
import { getCurrentDate } from '@/lib/get-date';
import { stateDefault } from '@/server-actions/stateMessage';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormCardFooter } from '@/components/form-element/form-footer';
import { TrasladoForm } from './form';
import { trasladoSchema } from '../validation/traslado';
import { createTraslado } from '@/server-actions/traslado';

interface CreateTrasladoFormProps {
  //
}

export function CreateTrasladoForm({}: CreateTrasladoFormProps) {
  const currentDate = getCurrentDate();

  const form = useForm<z.infer<typeof trasladoSchema>>({
    resolver: zodResolver(trasladoSchema),
    defaultValues: {
      fecha: currentDate,
      idUbicacionOrigen: 1,
      idUbicacionDestino: 2,
    },
  });

  const [state, formAction, isPending] = useActionState(
    createTraslado,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof trasladoSchema>) {
    startTransition(() => {
      formAction({ values: values as TrasladoFormType });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/traslados' });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Nuevo traslado</CardTitle>
            <CardDescription>
              Ingresa los datos, da click en siguiente cuando estés listo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TrasladoForm form={form} />
          </CardContent>
          <FormCardFooter
            isNew={true}
            isPending={isPending}
            label="Siguiente"
          />
        </Card>
      </form>
    </Form>
  );
}
