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
import { ReceiptById, ReceiptFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { receiptSchema } from '../validation/receipt';
import { stateDefault } from '@/server-actions/stateMessage';
import { updateReceipt } from '@/server-actions/receipt';
import { ReceiptForm } from './form';
import { ReceiptOptions } from './options';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EditReceiptForm {
  receipt: ReceiptById;
}

export function EditReceiptForm({ receipt }: EditReceiptForm) {
  const form = useForm<z.infer<typeof receiptSchema>>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      idPedido: receipt.idPedido,
      idCliente: receipt.idCliente,
      fecha: receipt.fecha,
      abono: receipt.abono,
      saldo: receipt.saldo,
      cambioDolar: receipt.cambioDolar,
      enCordobas: receipt.enCordobas,
      concepto: receipt.concepto,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateReceipt,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof receiptSchema>) {
    startTransition(() => {
      formAction({ id: receipt.id, values: values as ReceiptFormType });
    });
  }

  useServerActionFeedback(state, { refresh: true });

  return (
    <Tabs defaultValue="info">
      <TabsList className="w-full md:w-fit">
        <TabsTrigger value="info">Información</TabsTrigger>
        <TabsTrigger value="enviar">Enviar</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xl w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Editar recibo</CardTitle>
                <CardDescription>
                  Actualiza la información del recibo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ReceiptForm
                  form={form}
                  receipt={receipt}
                  saldoInicial={receipt.saldo + receipt.abono}
                />
              </CardContent>
              <FormCardFooter isPending={isPending} />
            </Card>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="enviar">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle className="text-sm">Enviar recibo</CardTitle>
            <CardDescription>Administra el recibo del pedido.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ReceiptOptions receipt={receipt} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
