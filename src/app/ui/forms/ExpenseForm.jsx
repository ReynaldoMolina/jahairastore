'use client';

import {
  FormButtons,
  FormContainer,
  FormDate,
  FormDiv,
  FormError,
  FormId,
  FormInput,
  FormSelect,
} from '@/app/ui/forms/FormInputs/formInputs';
import { useActionState } from 'react';
import { ExpensePayment } from './ExpensePayment';
import { createExpense, updateExpense } from '@/app/lib/actions';

export function ExpenseForm({ isNew, expense, searchParams, selectData }) {
  const action = isNew ? createExpense : updateExpense.bind(null, expense.Id);
  const [state, formAction, isPending] = useActionState(action, {
    message: '',
  });

  let compra,
    proveedor,
    concepto = '';

  if (isNew) {
    compra = searchParams?.compra || '';
    proveedor = searchParams?.proveedor || '';
    concepto = searchParams?.concepto || '';
  }

  return (
    <FormContainer action={formAction}>
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
    </FormContainer>
  );
}
