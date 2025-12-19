'use client';

import { FieldGroup, FieldSet } from '../../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';
import { formatNumber } from '@/lib/formatters';
import z from 'zod';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { orderDetailSchema } from '../../validation/order';
import { FormInput } from '@/components/form-elements/form-input';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface OrderDetailForm {
  form: UseFormReturn<z.infer<typeof orderDetailSchema>>;
  createMultiple?: boolean;
  setCreateMultiple?: Dispatch<SetStateAction<boolean>>;
  isNew?: boolean;
}

export function OrderDetailForm({
  form,
  createMultiple,
  setCreateMultiple,
  isNew = false,
}: OrderDetailForm) {
  const { precioVenta, precioCompra, cantidad } = form.watch();

  const ganancia = (precioVenta ?? 0) - (precioCompra ?? 0);

  return (
    <FieldGroup>
      <FieldSet>
        <FormInput
          control={form.control}
          name="idPedido"
          label="Id pedido"
          hidden
        />
        <FormTextArea
          control={form.control}
          name="nombreProducto"
          label="Nombre"
        />
      </FieldSet>
      <FieldSet className="md:flex-row">
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
          value={isNaN(Number(ganancia)) ? '0.00' : formatNumber(ganancia)}
          label="Ganancia"
          textAddon="$"
        />
      </FieldSet>

      <FieldSet className="sm:flex-row">
        <ButtonGroup
          aria-label="Media controls"
          className="h-fit items-end w-full"
        >
          <FormInput
            control={form.control}
            name="cantidad"
            label="Cantidad"
            className="rounded-r-none"
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

        <FormInput control={form.control} name="imagenUrl" label="Foto (url)" />
      </FieldSet>

      {isNew && (
        <FieldSet>
          <Label className="hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
            <Checkbox
              checked={!!createMultiple}
              onCheckedChange={() => setCreateMultiple((prev) => !prev)}
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none">¿Agregar varios productos?</p>
            </div>
          </Label>
        </FieldSet>
      )}
    </FieldGroup>
  );
}
