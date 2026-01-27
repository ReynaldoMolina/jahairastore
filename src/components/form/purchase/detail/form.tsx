'use client';

import { FieldGroup, FieldSet } from '../../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { roundToTwoDecimals } from '@/lib/formatters';
import z from 'zod';
import { FormInput } from '@/components/form-element/form-input';
import { PurchaseDetailType } from '@/types/types';
import { FormInputOnChange } from '@/components/form-element/form-input-on-change';
import { purchaseDetailSchema } from '../../validation/purchase';
import { FormTextAreaReadOnly } from '@/components/form-element/form-text-area-read-only';

interface PurchaseDetailForm {
  form: UseFormReturn<z.infer<typeof purchaseDetailSchema>>;
  detail?: PurchaseDetailType;
}

export function PurchaseDetailForm({ form, detail }: PurchaseDetailForm) {
  const { costo } = form.watch();
  const { cambioDolar, precioEnCordobas } = detail;

  return (
    <FieldGroup>
      <FieldSet>
        <FormInput
          control={form.control}
          name="idProducto"
          label="Id producto"
          hidden
        />
        <FormInput
          control={form.control}
          name="idCompra"
          label="Id compra"
          hidden
        />
        <FormTextAreaReadOnly value={detail.nombreProducto} label="Nombre" />
      </FieldSet>

      <FieldSet className="sm:flex-row">
        <FormInput control={form.control} name="cantidad" label="Cantidad" />

        <FormInput
          control={form.control}
          name="costo"
          label="Costo unitario"
          textAddon="$"
          hidden={precioEnCordobas}
        />

        {precioEnCordobas && (
          <FormInputOnChange
            value={roundToTwoDecimals(costo * cambioDolar)}
            label="Costo unitario"
            handleChange={(val) =>
              form.setValue('costo', Number(val) / cambioDolar)
            }
            textAddon="C$"
          />
        )}
      </FieldSet>
    </FieldGroup>
  );
}
