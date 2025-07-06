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

export function ExpenseForm({ children, isNew, expense, searchParams }) {
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
      {children}
      <ExpensePayment
        gasto={isNew ? '' : expense.Gasto * expense.Cambio_dolar}
        cambioDolar={isNew ? 37 : expense.Cambio_dolar}
        isNew={isNew}
      />
      <FormInput
        name="Concepto"
        holder="Descripción"
        value={isNew ? concepto : expense.Concepto}
      />
      <FormError isPending={isNew} state={state} />
      <FormButtons link="/gastos" isNew={isNew} isPending={isPending} />
    </FormContainer>
  );
}

// export function ExpenseEdit({ expense }) {
//   const updateExpenseWithId = updateExpense.bind(null, expense.Id);

//   return (
//     <FormContainer action={updateExpenseWithId}>
//       <FormId holder="Gasto" value={expense.Id} />
//       <FormDiv>
//         <FormInput
//           name="Id_compra"
//           holder="Compra"
//           value={expense.Id_compra}
//           type="number"
//         />
//         <FormDate name="Fecha" date={expense.Fecha} />
//       </FormDiv>
//       <FormSelect
//         value={expense.Id_proveedor}
//         name="Id_proveedor"
//         label="Proveedor"
//       />
//       <ExpensePayment
//         gasto={expense.Gasto * expense.Cambio_dolar}
//         cambioDolar={expense.Cambio_dolar}
//       />
//       <FormInput
//         name="Concepto"
//         holder="Descripción"
//         value={expense.Concepto}
//         required={false}
//       />

//       <FormButtons link="/gastos" label={'Guardar'} />
//     </FormContainer>
//   );
// }
