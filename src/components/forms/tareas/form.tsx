'use client';

import { FieldGroup, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { FormSelect } from '@/components/form-elements/form-select';
import { tareaSchema } from '../validation/tarea';
import { FormDatePicker } from '@/components/form-elements/form-date-picker';
import { FormTextArea } from '@/components/form-elements/form-text-area';

interface TareaForm {
  form: UseFormReturn<z.infer<typeof tareaSchema>>;
}

export function TareaForm({ form }: TareaForm) {
  return (
    <FieldGroup>
      <FormTextArea control={form.control} name="tarea" label="Tarea" />
      <FieldSet className="sm:flex-row">
        <FormDatePicker
          control={form.control}
          name="fecha_entrega"
          label="Fecha de entrega"
        />

        <FormSelect
          control={form.control}
          name="estado"
          label="Estado"
          options={[
            {
              value: 'Pendiente',
              label: 'Pendiente',
            },
            {
              value: 'En progreso',
              label: 'En progreso',
            },
            {
              value: 'Hecho',
              label: 'Hecho',
            },
          ]}
        />
      </FieldSet>
    </FieldGroup>
  );
}
