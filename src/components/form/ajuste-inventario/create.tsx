'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import { AjusteInventarioFormType } from '@/types/types';
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
import { ajusteInventarioSchema } from '../validation/ajuste-inventario';
import { createAjusteInventario } from '@/server-actions/ajuste-inventario';
import { AjusteInventarioForm } from './form';

interface CreateFormProps {
  //
}

export function CreateForm({}: CreateFormProps) {
  const currentDate = getCurrentDate();

  const form = useForm<z.infer<typeof ajusteInventarioSchema>>({
    resolver: zodResolver(ajusteInventarioSchema),
    defaultValues: {
      fecha: currentDate,
      idUbicacion: undefined,
      motivo: '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    createAjusteInventario,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof ajusteInventarioSchema>) {
    startTransition(() => {
      formAction({ values: values as AjusteInventarioFormType });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/ajuste-inventario' });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Nuevo ajuste</CardTitle>
            <CardDescription>
              Ingresa los datos, da click en siguiente cuando estés listo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AjusteInventarioForm form={form} />
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
