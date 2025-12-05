'use client';

import { startTransition, useActionState } from 'react';
import { Card, CardContent } from '../../ui/card';
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
