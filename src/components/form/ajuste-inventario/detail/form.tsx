'use client';

import { FieldGroup, FieldSet } from '../../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { FormInput } from '@/components/form-element/form-input';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { AjusteInventarioDetailType } from '@/types/types';
import { FormTextAreaReadOnly } from '@/components/form-element/form-text-area-read-only';
import { FormInputReadOnly } from '@/components/form-element/form-input-read-only';
import { ajusteInventarioDetailSchema } from '../../validation/ajuste-inventario';

interface DetailFormProps {
  form: UseFormReturn<z.infer<typeof ajusteInventarioDetailSchema>>;
  detail?: AjusteInventarioDetailType;
}

export function DetailForm({ form, detail }: DetailFormProps) {
  const { cantidad } = form.watch();
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
          name="idAjuste"
          label="Id ajuste"
          hidden
        />
        <FormTextAreaReadOnly value={detail.nombreProducto} label="Nombre" />
      </FieldSet>

      <FieldSet className="flex-row gap-3 md:gap-6 items-end">
        <FormInputReadOnly
          value={detail.existencias > 0 ? detail.existencias : 'Agotado'}
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
            onClick={() => {
              if (isNaN(Number(cantidad))) return;
              form.setValue('cantidad', Number(cantidad) - 1);
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
