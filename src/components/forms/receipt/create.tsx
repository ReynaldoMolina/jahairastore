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
import { ReceiptFormType, SearchParamsProps } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { getCurrentDate } from '@/lib/get-date';
import { receiptSchema } from '../validation/receipt';
import { stateDefault } from '@/server-actions/stateMessage';
import { createReceipt } from '@/server-actions/receipt';
import { ReceiptForm } from './form';

interface CreateReceiptForm {
  searchParams: SearchParamsProps;
  nombreCliente: string;
  cambioDolar: number;
}

export function CreateReceiptForm({
  searchParams,
  nombreCliente,
  cambioDolar,
}: CreateReceiptForm) {
  const currentDate = getCurrentDate();
  const idPedido = Number(searchParams?.pedido) || 0;
  const idCliente = Number(searchParams?.cliente) || 0;
  const saldoInicial = Number(searchParams?.saldo) || 0;
  const abono = Number(searchParams?.abono || 0);

  const form = useForm<z.infer<typeof receiptSchema>>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      idPedido: idPedido,
      idCliente: idCliente,
      fecha: currentDate,
      abono: abono,
      saldo: saldoInicial - abono,
      cambioDolar: cambioDolar,
      enCordobas: false,
      concepto: '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    createReceipt,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof receiptSchema>) {
    startTransition(() => {
      formAction({ values: values as ReceiptFormType });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/recibos' });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Nuevo recibo</CardTitle>
            <CardDescription>Ingresa los datos del recibo.</CardDescription>
          </CardHeader>
          <CardContent>
            <ReceiptForm
              form={form}
              nombreCliente={nombreCliente}
              saldoInicial={saldoInicial}
            />
          </CardContent>
          <FormCardFooter isNew={true} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
