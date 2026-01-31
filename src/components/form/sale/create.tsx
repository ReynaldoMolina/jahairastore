'use client';

import { startTransition, useActionState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import * as z from 'zod';
import { SaleFormType, SelectOptions } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-element/form-footer';
import { Form } from '@/components/ui/form';
import { getCurrentDate } from '@/lib/get-date';
import { saleSchema } from '../validation/sale';
import { SaleForm } from './form';
import { createSale } from '@/server-actions/sale';
import { stateDefault } from '@/server-actions/stateMessage';

interface CreateSaleForm {
  selectOptions: SelectOptions[];
  cambioDolar: number;
}

export function CreateSaleForm({ selectOptions, cambioDolar }: CreateSaleForm) {
  const currentDate = getCurrentDate();

  const form = useForm<z.infer<typeof saleSchema>>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      idCliente: 1,
      fecha: currentDate,
      abono: 0,
      credito: false,
      idUbicacion: undefined,
    },
  });

  const [state, formAction, isPending] = useActionState(
    createSale,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof saleSchema>) {
    startTransition(() => {
      formAction({ values: values as SaleFormType });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/ventas' });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Nueva venta</CardTitle>
            <CardDescription>
              Ingresa los datos de la venta, da click en siguiente cuando estés
              listo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SaleForm form={form} selectOptions={selectOptions} isNew />
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
