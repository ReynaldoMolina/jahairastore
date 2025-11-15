'use client';

import { FieldGroup, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormInput } from '@/components/form-elements/form-input';
import { FormDatePicker } from '@/components/form-elements/form-date-picker';
import z from 'zod';
import { bgColors } from '@/lib/bg-colors';
import { ExpenseById } from '@/types/types';
import { expenseSchema } from '../validation/expense';
import { FormInputOnChange } from '@/components/form-elements/form-input-on-change';

interface ExpenseForm {
  form: UseFormReturn<z.infer<typeof expenseSchema>>;
  expense?: ExpenseById;
  nombreEmpresa?: string;
}

export function ExpenseForm({ form, expense, nombreEmpresa }: ExpenseForm) {
  const { gasto, cambioDolar } = form.watch();

  return (
    <FieldGroup>
      <FieldSet className="flex-row gap-3 md:gap-6">
        <FormInput
          control={form.control}
          name="idCompra"
          label="Id compra"
          readOnly
        />
        <FormDatePicker control={form.control} name="fecha" label="Fecha" />
      </FieldSet>
      <FieldSet>
        <FormInputReadOnly
          value={expense ? expense.nombreEmpresa : nombreEmpresa}
          label="Proveedor"
        />
      </FieldSet>
      <FieldSet className="flex-row gap-3 md:gap-6">
        <FormInput
          control={form.control}
          name="cambioDolar"
          label="Cambio USD"
          textAddon="C$"
        />
        <FormInput
          control={form.control}
          name="gasto"
          label="Gasto"
          textAddon="$"
          className={bgColors.red}
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
          textAddon="C$"
        />
      </FieldSet>
      <FieldSet>
        <FormTextArea control={form.control} name="concepto" label="Concepto" />
      </FieldSet>
    </FieldGroup>
  );
}
