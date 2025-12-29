'use client';

import { FieldGroup, FieldSeparator, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormCheck } from '@/components/form-elements/form-checkbox';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import {
  formatNumber,
  roundToPointZeroOrFive,
  roundToTwoDecimals,
} from '@/lib/formatters';
import { productSchema } from '../validation/product';
import z from 'zod';
import { FormInputOnChange } from '@/components/form-elements/form-input-on-change';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormInput } from '@/components/form-elements/form-input';

interface ProductForm {
  form: UseFormReturn<z.infer<typeof productSchema>>;
}

export function ProductForm({ form }: ProductForm) {
  const {
    precioEnCordobas,
    precioVenta,
    precioVentaPorMayor,
    precioCompra,
    cambioDolar,
  } = form.watch();

  const ganancia = precioEnCordobas
    ? (roundToPointZeroOrFive(precioVenta * cambioDolar) ?? 0) -
      (roundToTwoDecimals(precioCompra * cambioDolar) ?? 0)
    : (precioVenta ?? 0) - (precioCompra ?? 0);

  return (
    <FieldGroup>
      <FieldSet className="hidden">
        <FormInput
          control={form.control}
          name="idProveedor"
          label="Id proveedor"
        />
        <FormInput
          control={form.control}
          name="descripcion"
          label="Descripción"
        />
        <FormInput control={form.control} name="fecha" label="Fecha" />
      </FieldSet>
      <FieldSet>
        <FormTextArea control={form.control} name="nombre" label="Nombre" />
      </FieldSet>
      <FieldSet>
        <FormCheck
          control={form.control}
          name="precioEnCordobas"
          label="Precio en córdobas"
        />
      </FieldSet>

      <div className={precioEnCordobas ? 'hidden' : 'flex flex-col gap-7'}>
        <FieldSet className="sm:flex-row">
          <FormInput
            control={form.control}
            name="precioCompra"
            label="Precio compra"
            textAddon="$"
          />
          <FormInput
            control={form.control}
            name="precioVenta"
            label="Precio venta"
            textAddon="$"
          />
          <FormInput
            control={form.control}
            name="precioVentaPorMayor"
            label="Venta por mayor"
            textAddon="$"
          />
        </FieldSet>
      </div>

      {precioEnCordobas && (
        <>
          <FieldSet className="sm:flex-row">
            <FormInputOnChange
              value={
                isNaN(Number(precioCompra))
                  ? ''
                  : roundToTwoDecimals(precioCompra * cambioDolar)
              }
              label="Precio compra"
              handleChange={(val) =>
                form.setValue('precioCompra', Number(val) / cambioDolar)
              }
              textAddon="C$"
            />
            <FormInputOnChange
              value={
                isNaN(Number(precioVenta))
                  ? ''
                  : roundToPointZeroOrFive(precioVenta * cambioDolar)
              }
              label="Precio venta"
              handleChange={(val) =>
                form.setValue('precioVenta', Number(val) / cambioDolar)
              }
              textAddon="C$"
            />
            <FormInputOnChange
              value={
                isNaN(Number(precioVentaPorMayor))
                  ? ''
                  : roundToPointZeroOrFive(precioVentaPorMayor * cambioDolar)
              }
              label="Venta por mayor"
              handleChange={(val) =>
                form.setValue('precioVentaPorMayor', Number(val) / cambioDolar)
              }
              textAddon="C$"
            />
          </FieldSet>
        </>
      )}

      <FormInputReadOnly
        value={formatNumber(ganancia)}
        label="Ganancia"
        textAddon={precioEnCordobas ? 'C$' : '$'}
      />

      <FieldSeparator />
      <FieldSet className="sm:flex-row">
        <FormInput
          control={form.control}
          name="cambioDolar"
          label="Cambio USD"
          textAddon="C$"
        />
        <FormInput control={form.control} name="codigo" label="Código" />
      </FieldSet>
    </FieldGroup>
  );
}
