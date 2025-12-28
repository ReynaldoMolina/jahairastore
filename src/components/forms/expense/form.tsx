'use client';

import { FieldGroup, FieldSeparator, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormInput } from '@/components/form-elements/form-input';
import { FormDatePicker } from '@/components/form-elements/form-date-picker';
import z from 'zod';
import { ExpenseById } from '@/types/types';
import { expenseSchema } from '../validation/expense';
import { FormInputOnChange } from '@/components/form-elements/form-input-on-change';
import { FormCheck } from '@/components/form-elements/form-checkbox';

interface ExpenseForm {
  form: UseFormReturn<z.infer<typeof expenseSchema>>;
  expense?: ExpenseById;
  nombreEmpresa?: string;
}

export function ExpenseForm({ form, expense, nombreEmpresa }: ExpenseForm) {
  const { gasto, cambioDolar, enCordobas } = form.watch();

  return (
    <FieldGroup>
      <FieldSet className="flex-row gap-3 md:gap-6">
        <FormInput
          control={form.control}
          name="idCompra"
          label="Compra"
          readOnly
          textAddon="#"
        />
        <FormDatePicker control={form.control} name="fecha" label="Fecha" />
      </FieldSet>
      <FieldSet>
        <FormInputReadOnly
          value={expense ? expense.nombreEmpresa : nombreEmpresa}
          label="Proveedor"
        />
      </FieldSet>

      <FieldSeparator />
      <FormCheck control={form.control} name="enCordobas" label="En córdobas" />

      <FieldSet className="sm:flex-row">
        <FormInput
          control={form.control}
          name="gasto"
          label="Gasto"
          textAddon="$"
          hidden={enCordobas}
        />
        <FormInputOnChange
          value={gasto * cambioDolar}
          label="Gasto"
          handleChange={(val) => {
            const num = Number(val);
            if (!isNaN(num)) {
              form.setValue('gasto', num / cambioDolar);
            }
          }}
          hidden={!enCordobas}
          textAddon="C$"
        />
        <FormInput
          control={form.control}
          name="cambioDolar"
          label="Cambio USD"
          textAddon="C$"
        />
      </FieldSet>
      <FieldSet>
        <FormTextArea control={form.control} name="concepto" label="Concepto" />
      </FieldSet>
    </FieldGroup>
  );
}
