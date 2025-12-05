'use client';

import { FieldGroup, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormInput } from '@/components/form-elements/form-input';
import z from 'zod';
import { FormSelect } from '@/components/form-elements/form-select';
import { tareaSchema } from '../validation/tarea';
import { FormDatePicker } from '@/components/form-elements/form-date-picker';
import { FormCheck } from '@/components/form-elements/form-checkbox';
import { FormTextArea } from '@/components/form-elements/form-text-area';

interface TareaForm {
  form: UseFormReturn<z.infer<typeof tareaSchema>>;
  isNew?: boolean;
}

export function TareaForm({ form, isNew = false }: TareaForm) {
  return (
    <FieldGroup>
      <FieldSet>
        <FormTextArea control={form.control} name="tarea" label="Tarea" />
        <FormDatePicker
          control={form.control}
          name="fecha_entrega"
          label="Fecha de entrega"
        />
        <FormSelect
          control={form.control}
          name="prioridad"
          label="Prioridad"
          options={[
            {
              value: 'Baja',
              label: 'Baja',
            },
            {
              value: 'Media',
              label: 'Media',
            },
            {
              value: 'Alta',
              label: 'Alta',
            },
            {
              value: 'Urgente',
              label: 'Urgente',
            },
          ]}
        />
        {!isNew && (
          <FormCheck
            control={form.control}
            name="completado"
            label="Completado?"
            description="Marcar tarea como completada."
          />
        )}
      </FieldSet>
    </FieldGroup>
  );
}
