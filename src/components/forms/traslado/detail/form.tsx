'use client';

import { FieldGroup, FieldSet } from '../../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { FormInput } from '@/components/form-elements/form-input';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { TrasladoDetailType } from '@/types/types';
import { FormTextAreaReadOnly } from '@/components/form-elements/form-text-area-read-only';
import { trasladoDetailSchema } from '../../validation/traslado';
import { FormInputReadOnly } from '@/components/form-elements/form-input-read-only';

interface DetailFormProps {
  form: UseFormReturn<z.infer<typeof trasladoDetailSchema>>;
  detail?: TrasladoDetailType;
}

export function DetailForm({ form, detail }: DetailFormProps) {
  const { cantidad } = form.watch();

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
          name="idTraslado"
          label="Id traslado"
          hidden
        />
        <FormTextAreaReadOnly value={detail.nombreProducto} label="Nombre" />
      </FieldSet>

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
