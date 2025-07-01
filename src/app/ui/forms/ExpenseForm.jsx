import {
  FormContainer,
  FormDiv,
  FormInput,
  FormButtons,
  FormDate,
  FormId,
  FormSelect,
} from '@/app/ui/forms/FormInputs/formInputs';
import { createExpense, updateExpense } from '@/app/lib/actions';
import { ExpensePayment } from './ExpensePayment';

export function ExpenseCreate({ searchParams }) {
  const compra = searchParams?.compra || '';
  const proveedor = searchParams?.proveedor || '';
  const concepto = searchParams?.concepto || '';

  return (
    <FormContainer action={createExpense}>
      <FormId holder="Crear gasto" />
      <FormDiv>
        <FormInput
          name="Id_compra"
          holder="Compra"
          value={compra}
          type="number"
        />
        <FormDate name="Fecha" />
      </FormDiv>
      <FormSelect value={proveedor} name="Id_proveedor" label="Proveedor" />
      <ExpensePayment gasto={0} />
      <FormInput name="Concepto" holder="Descripción" value={concepto} />
      <FormButtons link="/gastos" label={'Crear'} />
    </FormContainer>
  );
}

export function ExpenseEdit({ expense }) {
  const updateExpenseWithId = updateExpense.bind(null, expense.Id);

  return (
    <FormContainer action={updateExpenseWithId}>
      <FormId holder="Gasto" value={expense.Id} />
      <FormDiv>
        <FormInput
          name="Id_compra"
          holder="Compra"
          value={expense.Id_compra}
          type="number"
        />
        <FormDate name="Fecha" date={expense.Fecha} />
      </FormDiv>
      <FormSelect
        value={expense.Id_proveedor}
        name="Id_proveedor"
        label="Proveedor"
      />
      <ExpensePayment
        gasto={expense.Gasto * expense.Cambio_dolar}
        cambioDolar={expense.Cambio_dolar}
      />
      <FormInput
        name="Concepto"
        holder="Descripción"
        value={expense.Concepto}
        required={false}
      />

      <FormButtons link="/gastos" label={'Guardar'} />
    </FormContainer>
  );
}
