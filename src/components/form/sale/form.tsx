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
import { FormComboBox } from '@/components/form-element/form-combo-box';
import { saleSchema } from '../validation/sale';
import { FormDatePicker } from '@/components/form-element/form-date-picker';
import { FormCheck } from '@/components/form-element/form-checkbox';
import { FormInput } from '@/components/form-element/form-input';
import { FormInputReadOnly } from '@/components/form-element/form-input-read-only';
import { formatNumber } from '@/lib/formatters';
import { calculateTotals } from '@/lib/calculate-totals';
import { FormSelect } from '@/components/form-element/form-select';
import { ubicaciones } from '@/lib/ubicaciones-options';

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
  const { credito, abono } = form.watch();

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
          label="Ubicación"
          name="idUbicacion"
          description="De qué inventario salen los productos."
          options={ubicaciones}
        />
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend>Tipo de venta</FieldLegend>
        <FieldDescription>Si es al crédito o al contado.</FieldDescription>
        <FormCheck
          control={form.control}
          name="credito"
          label="Venta al crédito"
          onCheckedExtra={(checked) => {
            if (!isNew)
              form.setValue('abono', checked ? sale.abono : sale.total);
          }}
        />
        {credito && !isNew && (
          <>
            <FieldSet className="inline-flex sm:flex-row">
              <FormInputReadOnly
                value={formatNumber(sale.total)}
                label="Total"
                textAddon="C$"
              />
              <FormInput
                control={form.control}
                name="abono"
                label="Abono"
                textAddon="C$"
              />
              <FormInputReadOnly
                value={formatNumber(sale.total - abono)}
                label="Saldo"
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
