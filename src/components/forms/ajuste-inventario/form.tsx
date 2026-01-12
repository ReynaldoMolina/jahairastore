'use client';

import { FieldGroup, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { FormDatePicker } from '@/components/form-elements/form-date-picker';
import { FormSelect } from '@/components/form-elements/form-select';
import { ubicaciones } from '@/lib/ubicaciones-options';
import { ajusteInventarioSchema } from '../validation/ajuste-inventario';
import { FormTextArea } from '@/components/form-elements/form-text-area';

interface AjusteInventarioFormProps {
  form: UseFormReturn<z.infer<typeof ajusteInventarioSchema>>;
}

export function AjusteInventarioForm({ form }: AjusteInventarioFormProps) {
  const { idUbicacion } = form.watch();
  const value = idUbicacion === 1 ? 'León' : 'Acoyapa';
  return (
    <FieldGroup>
      <FieldSet>
        <FormDatePicker control={form.control} label="Fecha" name="fecha" />
        <FormSelect
          control={form.control}
          label="Almacén"
          name="idUbicacion"
          options={ubicaciones}
        />
        <FormTextArea control={form.control} label="Motivo" name="motivo" />
      </FieldSet>
    </FieldGroup>
  );
}
