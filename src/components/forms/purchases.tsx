'use client';

import {
  FormButtons,
  FormError,
} from '@/components/forms/form-inputs/form-inputs';
import { ActionType, PurchaseFormType, SelectOptions } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { purchaseSchema } from './schemas/form-schemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { getFormLabels } from '@/utils/get-form-labels';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { createProvider, updateProvider } from '@/server-actions/providers';
import FormCombobox from './form-inputs/form-combo-box';
import { DatePicker } from '../date-picker';
import { getCurrentDate } from '@/utils/get-current-date';

interface ProviderFormProps {
  action: ActionType;
  purchase?: PurchaseFormType;
  providers: SelectOptions[];
}

export function PurchasesForm({
  action,
  purchase,
  providers,
}: ProviderFormProps) {
  const form = useForm<z.infer<typeof purchaseSchema>>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: purchase
      ? {
          id_proveedor: purchase.id_proveedor ?? 0,
          fecha: purchase.fecha ?? '',
        }
      : {
          id_proveedor: 0,
          fecha: getCurrentDate(),
        },
  });

  const newAction =
    action === 'create'
      ? createProvider
      : updateProvider.bind(null, purchase?.id);

  const [state, formAction, isPending] = useActionState(newAction, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof purchaseSchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  const { cardTitle, cardDescription } = getFormLabels(action, 'f', 'compra');

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-2xl w-full">
        <CardHeader className="border-b">
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormCombobox
              form={form}
              name="id_proveedor"
              label="Proveedor"
              options={providers}
            />
            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha</FormLabel>
                  <DatePicker field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError isPending={isPending} state={state} />
            <FormButtons action={action} isPending={isPending} />
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
