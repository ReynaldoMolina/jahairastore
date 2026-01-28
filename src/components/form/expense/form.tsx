'use client';

import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormInputReadOnly } from '@/components/form-element/form-input-read-only';
import { FormTextArea } from '@/components/form-element/form-text-area';
import { FormInput } from '@/components/form-element/form-input';
import { FormDatePicker } from '@/components/form-element/form-date-picker';
import z from 'zod';
import { ExpenseById } from '@/types/types';
import { expenseSchema } from '../validation/expense';
import { FormInputOnChange } from '@/components/form-element/form-input-on-change';
import { FormCheck } from '@/components/form-element/form-checkbox';
import { roundToTwoDecimals } from '@/lib/formatters';

interface ExpenseForm {
  form: UseFormReturn<z.infer<typeof expenseSchema>>;
  expense?: ExpenseById;
  nombreEmpresa?: string;
}

export function ExpenseForm({ form, expense, nombreEmpresa }: ExpenseForm) {
  const { gasto, cambioDolar, enDolares, anulado } = form.watch();

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
        <FormCheck
          control={form.control}
          name="anulado"
          label="Anular"
          onCheckedExtra={() => {
            form.setValue('gasto', 0);
          }}
        />
      </FieldSet>

      <div className={anulado ? 'hidden' : 'flex flex-col gap-6'}>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Monto</FieldLegend>
          <FieldDescription>Monto del gasto</FieldDescription>
          <FormCheck
            control={form.control}
            name="enDolares"
            label="En dólares"
          />
          <FormInput
            control={form.control}
            name="gasto"
            label="Gasto"
            textAddon="C$"
            hidden={enDolares}
          />
          <FormInputOnChange
            value={roundToTwoDecimals(gasto / cambioDolar)}
            label="Gasto"
            handleChange={(val) => {
              const num = Number(val);
              if (!isNaN(num)) {
                form.setValue('gasto', num * cambioDolar);
              }
            }}
            hidden={!enDolares}
            textAddon="$"
          />
          <FormInput
            control={form.control}
            name="cambioDolar"
            label="Cambio USD"
            textAddon="C$"
            hidden={!enDolares}
          />
        </FieldSet>
      </div>

      <FieldSet>
        <FormTextArea control={form.control} name="concepto" label="Concepto" />
      </FieldSet>
    </FieldGroup>
  );
}
