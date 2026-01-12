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
import { SaleById, SelectOptions } from '@/types/types';
import { FormComboBox } from '@/components/form-elements/form-combo-box';
import { saleSchema } from '../validation/sale';
import { FormDatePicker } from '@/components/form-elements/form-date-picker';
import { FormCheck } from '@/components/form-elements/form-checkbox';
import { FormInput } from '@/components/form-elements/form-input';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import { formatNumber } from '@/lib/formatters';
import { calculateTotals } from '@/lib/calculate-totals';
import { FormSelect } from '@/components/form-elements/form-select';

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
        <FormDatePicker control={form.control} label="Fecha" name="fecha" />
        <FormComboBox
          control={form.control}
          name="idCliente"
          selectOptions={selectOptions}
          label="Cliente"
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
        <FormInput
          control={form.control}
          name="cambioDolar"
          label="Cambio USD"
          textAddon="C$"
        />
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend>Tipo de venta</FieldLegend>
        <FieldDescription>Si es al credito o al contado.</FieldDescription>
        <FormCheck
          control={form.control}
          name="credito"
          label="Venta al crédito"
          onCheckedExtra={(checked) => {
            if (!isNew) {
              form.setValue('abono', checked ? sale.abono : totalSell);
              form.setValue('saldo', checked ? totalSell - sale.abono : 0);
            }
          }}
        />
        {credito && !isNew && (
          <>
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
          </>
        )}
      </FieldSet>
    </FieldGroup>
  );
}
