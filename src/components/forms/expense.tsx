'use client';

import {
  FormButtons,
  FormError,
} from '@/components/forms/form-inputs/form-inputs';
import { startTransition, useActionState } from 'react';
import { ExpensePayment } from './expense-payment';
import {
  ActionType,
  ExpenseFormType,
  SearchParamsProps,
  SelectOptions,
} from '@/types/types';
import { useForm } from 'react-hook-form';
import { expenseSchema } from './schemas/form-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { getCurrentDate } from '@/utils/get-current-date';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { createExpense, updateExpense } from '@/server-actions/actions';
import FormTextArea from './form-inputs/form-text-area';
import { getFormLabels } from '@/utils/get-form-labels';
import FormInput from './form-inputs/form-input';
import { DatePicker } from '../date-picker';
import FormCombobox from './form-inputs/form-combo-box';

interface ExpenseFormProps {
  action: ActionType;
  expense?: ExpenseFormType;
  searchParams: SearchParamsProps;
  selectData: SelectOptions[];
}

export function ExpenseForm({
  action,
  expense,
  searchParams,
  selectData,
}: ExpenseFormProps) {
  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: expense
      ? {
          id_compra: expense.id_compra ?? 0,
          id_proveedor: expense.id_proveedor ?? 0,
          fecha: expense.fecha ?? '',
          gasto: expense.gasto ?? 0,
          concepto: expense.concepto ?? '',
          cambio_dolar: expense.cambio_dolar ?? 37,
        }
      : {
          id_compra: 0,
          id_proveedor: 0,
          fecha: getCurrentDate(),
          gasto: 0,
          concepto: '',
          cambio_dolar: 37,
        },
  });

  const newAction =
    action === 'create' ? createExpense : updateExpense.bind(null, expense?.id);

  const [state, formAction, isPending] = useActionState(newAction, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof expenseSchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  let compra,
    proveedor,
    concepto = '';

  if (action === 'create') {
    compra = searchParams?.compra || '';
    proveedor = searchParams?.proveedor || '';
    concepto = searchParams?.concepto || '';
  }

  const { cardTitle, cardDescription } = getFormLabels(action, 'm', 'gasto');

  return (
    <>
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
              <FormInput
                control={form.control}
                name="id_compra"
                label="Id compra"
              />
              <FormField
                control={form.control}
                name="fecha"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Emitida el</FormLabel>
                    <DatePicker field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormCombobox
                form={form}
                name="id_proveedor"
                label="Proveedor"
                options={[]}
              />
              {/* <FormInput
                control={form.control}
                name="cambio_dolar"
                label="Cambio USD"
              /> */}
              <ExpensePayment form={form} expense={expense} action={action} />
              <FormTextArea
                control={form.control}
                name="concepto"
                label="Concepto"
              />
              <FormError isPending={isPending} state={state} />
              <FormButtons action={action} isPending={isPending} />
            </form>
          </CardContent>
        </Card>
      </Form>

      {/* <FormContainer action={formAction}>
        <FormId
          holder={isNew ? 'Crear gasto' : 'Gasto'}
          value={isNew ? '' : expense.Id}
        />
        <FormDiv>
          <FormInput
            name="Id_compra"
            holder="Compra"
            value={isNew ? compra : expense.Id_compra}
            type="number"
          />
          <FormDate name="Fecha" date={isNew ? '' : expense.Fecha} />
        </FormDiv>
        <FormSelect
          value={isNew ? proveedor : expense.Id_proveedor}
          name="Id_proveedor"
          data={selectData}
        />
        <ExpensePayment
          gasto={isNew ? '' : expense.Gasto * expense.Cambio_dolar}
          cambioDolar={isNew ? 37 : expense.Cambio_dolar}
          isNew={isNew}
        />
        <FormInput
          name="Concepto"
          holder="Concepto"
          value={isNew ? concepto : expense.Concepto}
        />
        <FormError isPending={isNew} state={state} />
        <FormButtons isNew={isNew} isPending={isPending} />
      </FormContainer> */}
    </>
  );
}
