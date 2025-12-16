'use client';

import { FieldGroup, FieldSeparator, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { SaleById, SelectOptions } from '@/types/types';
import { FormComboBox } from '@/components/form-elements/form-combo-box';
import { saleSchema } from '../validation/sale';
import { FormDatePicker } from '@/components/form-elements/form-date-picker';
import { FormCheck } from '@/components/form-elements/form-checkbox';
import { FormInput } from '@/components/form-elements/form-input';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import { formatNumber } from '@/lib/formatters';
import { calculateTotals } from '@/lib/calculate-totals';

interface SaleForm {
  form: UseFormReturn<z.infer<typeof saleSchema>>;
  selectOptions: SelectOptions[];
  sale?: SaleById;
  isNew?: boolean;
}

export function SaleForm({
  form,
  selectOptions,
  sale,
  isNew = false,
}: SaleForm) {
  const { credito } = form.watch();

  let totalSell = 0;
  if (!isNew) {
    const totals = calculateTotals({
      list: sale.detail,
      convert: true,
    });
    totalSell = totals.totalSell;
  }

  return (
    <FieldGroup>
      <FieldSet>
        <FormComboBox
          control={form.control}
          name="idCliente"
          selectOptions={selectOptions}
          label="Cliente"
        />
        <FormDatePicker control={form.control} label="Fecha" name="fecha" />
      </FieldSet>
      <FieldSet>
        <FormCheck
          control={form.control}
          name="credito"
          label="¿Al crédito?"
          description="Marcar como venta al crédito."
          onCheckedExtra={(checked) => {
            if (!isNew) {
              form.setValue('abono', checked ? sale.abono : totalSell);
              form.setValue('saldo', checked ? totalSell - sale.abono : 0);
            }
          }}
        />
        {credito && !isNew && (
          <>
            <FieldSeparator className="md:hidden" />
            <FieldSet className="inline-flex sm:flex-row">
              <FormInputReadOnly
                value={formatNumber(totalSell)}
                label="Total"
                textAddon="C$"
              />
              <FormInput
                control={form.control}
                name="abono"
                label="Abono"
                onChangeExtra={(value) =>
                  form.setValue(
                    'saldo',
                    isNaN(Number(value)) ? 0 : totalSell - Number(value)
                  )
                }
                textAddon="C$"
              />
              <FormInput
                control={form.control}
                name="saldo"
                label="Saldo"
                readOnly
                textAddon="C$"
              />
            </FieldSet>
            <FieldSeparator className="md:hidden" />
            <FormInput
              control={form.control}
              name="cambioDolar"
              label="Cambio USD"
              textAddon="C$"
            />
          </>
        )}
      </FieldSet>
    </FieldGroup>
  );
}
