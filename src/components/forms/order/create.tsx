'use client';

import { startTransition, useActionState } from 'react';
import * as z from 'zod';
import {
  OrderFormType,
  SelectOptions,
  SettingsCambioDolarType,
} from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { Form } from '@/components/ui/form';
import { getCurrentDate } from '@/lib/get-date';
import { stateDefault } from '@/server-actions/stateMessage';
import { orderSchema } from '../validation/order';
import { createOrder } from '@/server-actions/order';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { OrderForm } from './form';

interface CreateOrderForm {
  selectOptions: SelectOptions[];
  cambioDolar: number;
  envioPrices: SettingsCambioDolarType;
}

export function CreateOrderForm({
  selectOptions,
  cambioDolar,
  envioPrices,
}: CreateOrderForm) {
  const currentDate = getCurrentDate();

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      idCliente: 0,
      fecha: currentDate,
      peso: 0,
      cambioDolar: cambioDolar,
      precioLibra: envioPrices.envioMaritimo,
      tipoEnvio: 'maritimo',
    },
  });

  const [state, formAction, isPending] = useActionState(
    createOrder,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof orderSchema>) {
    startTransition(() => {
      formAction({ values: values as OrderFormType });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/pedidos' });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Nuevo pedido</CardTitle>
            <CardDescription>
              Ingresa los datos del pedido, da click en siguiente cundo estés
              listo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OrderForm
              form={form}
              selectOptions={selectOptions}
              envioPrices={envioPrices}
              isNew
            />
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
