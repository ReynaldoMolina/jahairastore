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
import { ExpenseById, ExpenseFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { stateDefault } from '@/server-actions/stateMessage';
import { expenseSchema } from '../validation/expense';
import { updateExpense } from '@/server-actions/expense';
import { ExpenseForm } from './form';

interface EditExpenseForm {
  expense: ExpenseById;
}

export function EditExpenseForm({ expense }: EditExpenseForm) {
  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      idCompra: expense.idCompra,
      idProveedor: expense.idProveedor,
      fecha: expense.fecha,
      gasto: expense.gasto,
      concepto: expense.concepto,
      cambioDolar: expense.cambioDolar,
      enCordobas: expense.enCordobas,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateExpense,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof expenseSchema>) {
    startTransition(() => {
      formAction({ id: expense.id, values: values as ExpenseFormType });
    });
  }

  useServerActionFeedback(state, { refresh: true });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Editar gasto</CardTitle>
            <CardDescription>
              Actualiza la información del gasto.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ExpenseForm form={form} expense={expense} />
          </CardContent>
          <FormCardFooter isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
