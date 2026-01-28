'use client';

import { FieldGroup, FieldSet } from '../../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormInputReadOnly } from '@/components/form-element/form-input-read-only';
import { roundToPointZeroOrFive, roundToTwoDecimals } from '@/lib/formatters';
import z from 'zod';
import { FormInput } from '@/components/form-element/form-input';
import { saleDetailSchema } from '../../validation/sale';
import { SaleDetailType } from '@/types/types';
import { FormInputOnChange } from '@/components/form-element/form-input-on-change';
import { FormCheck } from '@/components/form-element/form-checkbox';
import { FormTextAreaReadOnly } from '@/components/form-element/form-text-area-read-only';

interface SaleDetailForm {
  form: UseFormReturn<z.infer<typeof saleDetailSchema>>;
  detail?: SaleDetailType;
}

export function SaleDetailForm({ form, detail }: SaleDetailForm) {
  const { precioVenta, precioVentaPorMayor, precioPorMayor, costo, cantidad } =
    form.watch();

  const { cambioDolar, precioEnDolares } = detail;
  const maxQuantity = (detail.existencias ?? 0) + (detail.cantidad ?? 0);
  const canAddQuantity = cantidad < maxQuantity;

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
          name="idVenta"
          label="Id venta"
          hidden
        />
        <FormTextAreaReadOnly value={detail.nombreProducto} label="Nombre" />
      </FieldSet>

      <FieldSet className="flex-row gap-3 md:gap-6 items-end">
        <FormInput control={form.control} name="cantidad" label="Cantidad" />
        <FormInputReadOnly
          value={canAddQuantity ? detail.existencias : 'Agotado'}
          label="Disponibles"
        />
      </FieldSet>

      <FieldSet className={precioEnDolares ? 'hidden' : 'sm:flex-row'}>
        <FormInput
          control={form.control}
          name="costo"
          label="Precio compra"
          textAddon="C$"
        />
        <FormInput
          control={form.control}
          name="precioVenta"
          label="Precio venta"
          textAddon="C$"
          hidden={precioPorMayor}
        />
        <FormInput
          control={form.control}
          name="precioVentaPorMayor"
          label="Venta por mayor"
          textAddon="C$"
          hidden={!precioPorMayor}
        />
      </FieldSet>

      {precioEnDolares && (
        <FieldSet className="sm:flex-row">
          <FormInputOnChange
            value={roundToTwoDecimals(costo / cambioDolar)}
            label="Precio compra"
            handleChange={(val) =>
              form.setValue('costo', Number(val) * cambioDolar)
            }
            textAddon="$"
          />
          <FormInputOnChange
            value={roundToPointZeroOrFive(precioVenta / cambioDolar)}
            label="Precio venta"
            handleChange={(val) =>
              form.setValue('precioVenta', Number(val) * cambioDolar)
            }
            textAddon="$"
            hidden={precioPorMayor}
          />
          <FormInputOnChange
            value={roundToPointZeroOrFive(precioVentaPorMayor / cambioDolar)}
            label="Venta por mayor"
            handleChange={(val) =>
              form.setValue('precioVentaPorMayor', Number(val) * cambioDolar)
            }
            textAddon="$"
            hidden={!precioPorMayor}
          />
        </FieldSet>
      )}

      <FormCheck
        control={form.control}
        name="precioPorMayor"
        label="Usar precio de venta al por mayor"
      />
    </FieldGroup>
  );
}
