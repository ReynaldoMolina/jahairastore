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
import { PurchaseFormType, SelectOptions } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { getCurrentDate } from '@/lib/get-date';
import { PurchaseForm } from './form';
import { stateDefault } from '@/server-actions/stateMessage';
import { purchaseSchema } from '../validation/purchase';
import { createPurchase } from '@/server-actions/purchase';

interface CreatePurchaseForm {
  selectOptions: SelectOptions[];
}

export function CreatePurchaseForm({ selectOptions }: CreatePurchaseForm) {
  const currentDate = getCurrentDate();

  const form = useForm<z.infer<typeof purchaseSchema>>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      idProveedor: 0,
      fecha: currentDate,
      idUbicacion: 1,
    },
  });

  const [state, formAction, isPending] = useActionState(
    createPurchase,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof purchaseSchema>) {
    startTransition(() => {
      formAction({ values: values as PurchaseFormType });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/compras' });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Nueva compra</CardTitle>
            <CardDescription>
              Ingresa los datos de la compra, da click en siguiente cuando estés
              listo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PurchaseForm form={form} selectOptions={selectOptions} isNew />
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
