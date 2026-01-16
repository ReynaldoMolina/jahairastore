'use client';

import { FieldGroup, FieldSet } from '../../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormInputReadOnly } from '@/components/form-element/form-input-read-only';
import {
  formatNumber,
  roundToPointZeroOrFive,
  roundToTwoDecimals,
} from '@/lib/formatters';
import z from 'zod';
import { FormInput } from '@/components/form-element/form-input';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { PurchaseDetailType } from '@/types/types';
import { FormInputOnChange } from '@/components/form-element/form-input-on-change';
import { purchaseDetailSchema } from '../../validation/purchase';
import { FormTextAreaReadOnly } from '@/components/form-element/form-text-area-read-only';

interface PurchaseDetailForm {
  form: UseFormReturn<z.infer<typeof purchaseDetailSchema>>;
  detail?: PurchaseDetailType;
}

export function PurchaseDetailForm({ form, detail }: PurchaseDetailForm) {
  const { precioVenta, precioCompra, cantidad } = form.watch();

  const { cambioDolar, precioEnCordobas } = detail;

  const ganancia = (precioVenta ?? 0) - (precioCompra ?? 0);
  const gananciaEnCordobas = ganancia * cambioDolar;

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
      <FieldSet className={precioEnCordobas ? 'hidden' : 'sm:flex-row'}>
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
        <FieldSet className="sm:flex-row">
          <FormInputOnChange
            value={roundToTwoDecimals(precioCompra * cambioDolar)}
            label="Compra"
            handleChange={(val) =>
              form.setValue('precioCompra', Number(val) / cambioDolar)
            }
            textAddon="C$"
          />
          <FormInputOnChange
            value={roundToPointZeroOrFive(precioVenta * cambioDolar)}
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

      <FieldSet className="sm:flex-row">
        <FormInputReadOnly
          value={detail.existencias < 1 ? 'Agotado' : detail.existencias}
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
            onClick={() => {
              if (isNaN(Number(cantidad))) return;
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
