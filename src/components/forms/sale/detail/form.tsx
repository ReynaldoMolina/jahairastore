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

interface SaleDetailForm {
  form: UseFormReturn<z.infer<typeof saleDetailSchema>>;
  detail?: SaleDetailType;
}

export function SaleDetailForm({ form, detail }: SaleDetailForm) {
  const { precioVenta, precioCompra, cantidad } = form.watch();

  const { cambioDolar, precioEnCordobas } = detail;
  const ganancia = (precioVenta ?? 0) - (precioCompra ?? 0);
  const gananciaEnCordobas = ganancia * cambioDolar;

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
      </FieldSet>
      <FieldSet
        className={precioEnCordobas ? 'hidden' : 'gap-3 md:gap-6 flex-row'}
      >
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
        />
        <FormInputReadOnly
          value={formatNumber(ganancia)}
          label="Ganancia"
          textAddon="$"
        />
      </FieldSet>

      {precioEnCordobas && (
        <FieldSet className="flex-row gap-3 md:gap-6">
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
          />
          <FormInputReadOnly
            value={formatNumber(gananciaEnCordobas)}
            label="Ganancia"
            textAddon="C$"
          />
        </FieldSet>
      )}

      <FieldSet className="flex-row gap-3 md:gap-6 items-end">
        <FormInputReadOnly
          value={canAddQuantity ? detail.existencias : 'Agotado'}
          label="Disponibles"
        />
        <FormInput
          control={form.control}
          name="cantidad"
          label="Cantidad"
          readOnly
        />

        <ButtonGroup aria-label="Media controls" className="h-fit">
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
