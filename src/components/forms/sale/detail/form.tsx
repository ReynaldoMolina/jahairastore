'use client';

import { FieldGroup, FieldSet } from '../../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import { formatNumber } from '@/lib/formatters';
import z from 'zod';
import { FormInput } from '@/components/form-elements/form-input';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { saleDetailSchema } from '../../validation/sale';
import { SaleDetailType } from '@/types/types';
import { FormInputOnChange } from '@/components/form-elements/form-input-on-change';
import { FormCheck } from '@/components/form-elements/form-checkbox';

interface SaleDetailForm {
  form: UseFormReturn<z.infer<typeof saleDetailSchema>>;
  detail?: SaleDetailType;
}

export function SaleDetailForm({ form, detail }: SaleDetailForm) {
  const {
    precioVenta,
    precioVentaPorMayor,
    precioPorMayor,
    precioCompra,
    cantidad,
  } = form.watch();

  const { cambioDolar, precioEnCordobas } = detail;
  const ganancia = (precioVenta ?? 0) - (precioCompra ?? 0);
  const gananciaPorMayor = (precioVentaPorMayor ?? 0) - (precioCompra ?? 0);
  const gananciaEnCordobas = ganancia * cambioDolar;
  const gananciaPorMayorEnCordobas = gananciaPorMayor * cambioDolar;

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
        <FormInputReadOnly
          value={detail.nombreProducto}
          label="Nombre producto"
        />
        <FormCheck
          control={form.control}
          name="precioPorMayor"
          label="¿Usar precio de venta al por mayor?"
        />
      </FieldSet>

      <div className={precioEnCordobas ? 'hidden' : 'flex flex-col gap-7'}>
        <FieldSet className="sm:flex-row">
          <FormInput
            control={form.control}
            name="precioCompra"
            label="Compra"
            textAddon="$"
          />
          <FormInput
            control={form.control}
            name="precioVenta"
            label="Venta"
            textAddon="$"
            hidden={precioPorMayor}
          />
          <FormInput
            control={form.control}
            name="precioVentaPorMayor"
            label="Venta por mayor"
            textAddon="$"
            hidden={!precioPorMayor}
          />
        </FieldSet>
        <FormInputReadOnly
          value={
            precioPorMayor
              ? formatNumber(gananciaPorMayor)
              : formatNumber(ganancia)
          }
          label="Ganancia"
          textAddon="$"
        />
      </div>

      {precioEnCordobas && (
        <div className="flex flex-col gap-7">
          <FieldSet className="sm:flex-row">
            <FormInputOnChange
              value={precioCompra * cambioDolar}
              label="Compra"
              handleChange={(val) =>
                form.setValue('precioCompra', Number(val) / cambioDolar)
              }
              textAddon="C$"
            />
            <FormInputOnChange
              value={precioVenta * cambioDolar}
              label="Venta"
              handleChange={(val) =>
                form.setValue('precioVenta', Number(val) / cambioDolar)
              }
              textAddon="C$"
              hidden={precioPorMayor}
            />
            <FormInputOnChange
              value={precioVentaPorMayor * cambioDolar}
              label="Venta por mayor"
              handleChange={(val) =>
                form.setValue('precioVentaPorMayor', Number(val) / cambioDolar)
              }
              textAddon="C$"
              hidden={!precioPorMayor}
            />
            <FormInputReadOnly
              value={
                precioPorMayor
                  ? formatNumber(gananciaPorMayorEnCordobas)
                  : formatNumber(gananciaEnCordobas)
              }
              label="Ganancia"
              textAddon="C$"
            />
          </FieldSet>
        </div>
      )}

      <FieldSet className="flex-row gap-3 md:gap-6 items-end">
        <FormInputReadOnly
          value={canAddQuantity ? detail.existencias : 'Agotado'}
          label="Disponibles"
        />

        <ButtonGroup
          aria-label="Media controls"
          className="h-fit items-end w-full"
        >
          <FormInput
            control={form.control}
            name="cantidad"
            label="Cantidad"
            className="rounded-r-none"
            readOnly
          />
          <Button
            variant="outline"
            size="icon"
            disabled={cantidad <= 1}
            onClick={() => {
              if (isNaN(Number(cantidad))) return;
              if (cantidad > 1)
                return form.setValue('cantidad', Number(cantidad) - 1);
            }}
          >
            <MinusIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={!canAddQuantity}
            onClick={() => {
              if (isNaN(Number(cantidad))) return;
              if (canAddQuantity)
                form.setValue('cantidad', Number(cantidad) + 1);
            }}
          >
            <PlusIcon />
          </Button>
        </ButtonGroup>
      </FieldSet>
    </FieldGroup>
  );
}
