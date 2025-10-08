'use client';

import {
  FormButtons,
  FormError,
} from '@/components/forms/form-inputs/form-inputs';
import {
  ActionType,
  ProductsPurchasesModalTableType,
  PurchaseFormType,
  SelectOptions,
} from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { purchaseSchema } from './validation/validation-schemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { getFormLabels } from '@/utils/get-form-labels';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { FormCombobox } from './form-inputs/form-combo-box';
import { DatePicker } from '../date-picker';
import { getCurrentDate } from '@/utils/get-current-date';
import { DataTableDetalle } from '../table/data-table-detalle';
import { columns } from '@/app/(store)/compras/columns-detalle';
import { FormInputGroup } from './form-inputs/form-input-group';
import { createPurchase, updatePurchase } from '@/server-actions/purchases';

interface PurchaseFormProps {
  action: ActionType;
  purchase?: PurchaseFormType;
  providers: SelectOptions;
  products?: ProductsPurchasesModalTableType[];
  purchasedetail?: any;
}

export function PurchasesForm({
  action,
  purchase,
  providers,
  products,
  purchasedetail,
}: PurchaseFormProps) {
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
      ? createPurchase
      : updatePurchase.bind(null, purchase?.id);

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
      <Card className="mx-auto max-w-5xl w-full">
        <CardHeader className="border-b">
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>
            {cardDescription}{' '}
            {action === 'create' &&
              'Después de crear la orden puedes agregar productos.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormInputGroup>
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
            </FormInputGroup>
            {action === 'edit' && purchasedetail && (
              <DataTableDetalle
                columns={columns}
                data={purchasedetail}
                products={products ?? []}
                id_compra={purchase?.id}
              />
            )}
            <FormError isPending={isPending} state={state} />
            <FormButtons action={action} isPending={isPending} />
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
