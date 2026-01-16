'use client';

import { startTransition, useActionState } from 'react';
import { Card, CardContent } from '../../ui/card';
import * as z from 'zod';
import {
  OrderById,
  OrderFormType,
  SelectOptions,
  SettingsCambioDolarType,
} from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-element/form-footer';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { stateDefault } from '@/server-actions/stateMessage';
import { FormDetail } from './form-detail';
import { OrderForm } from './form';
import { orderSchema } from '../validation/order';
import { updateOrder } from '@/server-actions/order';
import { OrderShipping } from './order-shipping';
import { OrderPayment } from './order-payment';

interface EditOrderForm {
  order: OrderById;
  selectOptions: SelectOptions[];
  envioPrices: SettingsCambioDolarType;
}

export function EditOrderForm({
  order,
  selectOptions,
  envioPrices,
}: EditOrderForm) {
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      idCliente: order.idCliente,
      fecha: order.fecha,
      peso: order.peso,
      precioLibra: order.precioLibra,
      cambioDolar: order.cambioDolar,
      tipoEnvio: order.tipoEnvio,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateOrder,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof orderSchema>) {
    startTransition(() => {
      formAction({ id: order.id, values: values as OrderFormType });
    });
  }

  useServerActionFeedback(state, { refresh: true });

  return (
    <Tabs defaultValue="productos">
      <TabsList className="w-full sm:w-fit overflow-x-auto">
        <TabsTrigger value="productos">Productos</TabsTrigger>
        <TabsTrigger value="info">Información</TabsTrigger>
        <TabsTrigger value="envio">Envío</TabsTrigger>
        <TabsTrigger value="pagar" disabled={order.detail.length < 1}>
          Pagar
        </TabsTrigger>
      </TabsList>
      <TabsContent value="productos" className="space-y-3">
        <FormDetail order={order} />
      </TabsContent>
      <TabsContent value="info">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xl w-full"
          >
            <Card>
              <CardContent>
                <OrderForm
                  form={form}
                  order={order}
                  selectOptions={selectOptions}
                />
              </CardContent>
              <FormCardFooter isPending={isPending} />
            </Card>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="envio">
        <OrderShipping order={order} envioPrices={envioPrices} />
      </TabsContent>
      <TabsContent value="pagar">
        <OrderPayment order={order} />
      </TabsContent>
    </Tabs>
  );
}
