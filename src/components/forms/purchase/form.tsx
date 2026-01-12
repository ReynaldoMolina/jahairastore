'use client';

import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { PurchaseById, SelectOptions } from '@/types/types';
import { FormComboBox } from '@/components/form-elements/form-combo-box';
import { FormDatePicker } from '@/components/form-elements/form-date-picker';
import { calculateTotals } from '@/lib/calculate-totals';
import { purchaseSchema } from '../validation/purchase';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import { formatNumber } from '@/lib/formatters';
import { bgColors } from '@/lib/bg-colors';
import { FormSelect } from '@/components/form-elements/form-select';

interface PurchaseForm {
  form: UseFormReturn<z.infer<typeof purchaseSchema>>;
  selectOptions: SelectOptions[];
  purchase?: PurchaseById;
  isNew?: boolean;
}

export function PurchaseForm({
  form,
  selectOptions,
  purchase,
  isNew = false,
}: PurchaseForm) {
  let totalCost = 0;
  if (!isNew) {
    const totals = calculateTotals({
      list: purchase.detail,
      convert: true,
    });
    totalCost = totals.totalCost;
  }

  return (
    <FieldGroup>
      <FieldSet>
        <FormDatePicker control={form.control} label="Fecha" name="fecha" />
        <FormComboBox
          control={form.control}
          name="idProveedor"
          selectOptions={selectOptions}
          label="Proveedor"
        />
        <FormSelect
          control={form.control}
          label="Almacén"
          name="idUbicacion"
          description="De qué inventario salen los productos."
          options={[
            {
              value: '1',
              label: 'León',
            },
            {
              value: '2',
              label: 'Acoyapa',
            },
          ]}
        />
      </FieldSet>
      {!isNew && (
        <>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Totales</FieldLegend>
            <FieldDescription>
              Visualiza los totales de la compra.
            </FieldDescription>
            <div className="flex flex-col md:flex-row gap-6">
              <FormInputReadOnly
                value={`C$ ${formatNumber(totalCost)}`}
                label="Subtotal"
                className={bgColors.neutral}
              />
              <FormInputReadOnly
                value={`C$ ${formatNumber(purchase.gastos)}`}
                label="Gastos"
                className={bgColors.red}
              />
              <FormInputReadOnly
                value={`C$ ${formatNumber(totalCost + purchase.gastos)}`}
                label="Total compra"
                className={bgColors.blue}
              />
            </div>
          </FieldSet>
        </>
      )}
    </FieldGroup>
  );
}
