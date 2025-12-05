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
import { ExpenseFormType, SearchParamsProps } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { getCurrentDate } from '@/lib/get-date';
import { stateDefault } from '@/server-actions/stateMessage';
import { expenseSchema } from '../validation/expense';
import { ExpenseForm } from './form';
import { createExpense } from '@/server-actions/expense';

interface CreateExpenseForm {
  searchParams: SearchParamsProps;
  nombreEmpresa: string;
  cambioDolar: number;
}

export function CreateExpenseForm({
  searchParams,
  nombreEmpresa,
  cambioDolar,
}: CreateExpenseForm) {
  const currentDate = getCurrentDate();
  const idCompra = Number(searchParams?.compra) || 0;
  const idProveedor = Number(searchParams?.proveedor) || 0;
  const concepto = searchParams?.concepto || '';

  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      idCompra: idCompra,
      idProveedor: idProveedor,
      fecha: currentDate,
      gasto: 0,
      concepto: concepto,
      cambioDolar: cambioDolar,
    },
  });

  const [state, formAction, isPending] = useActionState(
    createExpense,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof expenseSchema>) {
    startTransition(() => {
      formAction({ values: values as ExpenseFormType });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/gastos' });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Nuevo gasto</CardTitle>
            <CardDescription>
              Ingresa la información del gasto, da click en crear cuando estés
              listo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseForm form={form} nombreEmpresa={nombreEmpresa} />
          </CardContent>
          <FormCardFooter isNew={true} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
