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
import { SaleOptions } from '../options/sales';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import { formatNumber } from '@/lib/formatters';
import { calculateTotals2 } from '@/lib/calculate-totals';

interface VentaForm {
  form: UseFormReturn<z.infer<typeof saleSchema>>;
  selectOptions: SelectOptions[];
  sale?: SaleById;
  isNew?: boolean;
}

export function VentaForm({
  form,
  selectOptions,
  sale,
  isNew = false,
}: VentaForm) {
  const { credito, abono } = form.watch();

  let totalSell = 0;
  if (!isNew) {
    const totals = calculateTotals2({
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
          onCheckedExtra={() => form.setValue('saldo', 0)}
        />
        {credito && !isNew && (
          <>
            <div className="inline-flex gap-3">
              <FormInputReadOnly
                value={formatNumber(totalSell)}
                label="Total"
              />
              <FormInput
                control={form.control}
                name="abono"
                label="Abono"
                disabled={!credito}
                onChangeExtra={(value) =>
                  form.setValue('saldo', totalSell - Number(value))
                }
              />
              <FormInput control={form.control} name="saldo" label="Saldo" />
            </div>
            <FormInput
              control={form.control}
              name="cambioDolar"
              label="Cambio USD"
              disabled={!credito}
            />
          </>
        )}
      </FieldSet>
      {!isNew && (
        <FieldSet>
          <SaleOptions sale={sale} />
        </FieldSet>
      )}
    </FieldGroup>
  );
}
