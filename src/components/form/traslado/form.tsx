'use client';

import { FieldGroup, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { FormDatePicker } from '@/components/form-element/form-date-picker';
import { FormSelect } from '@/components/form-element/form-select';
import { trasladoSchema } from '../validation/traslado';
import { ubicaciones } from '@/lib/ubicaciones-options';
import { FormInputReadOnly } from '@/components/form-element/form-input-read-only';

interface TrasladoFormProps {
  form: UseFormReturn<z.infer<typeof trasladoSchema>>;
}

export function TrasladoForm({ form }: TrasladoFormProps) {
  const { idUbicacionDestino } = form.watch();

  const value = idUbicacionDestino
    ? idUbicacionDestino === 1
      ? 'León'
      : 'Acoyapa'
    : 'Selecciona la ubicación de origen';
  return (
    <FieldGroup>
      <FieldSet>
        <FormDatePicker control={form.control} label="Fecha" name="fecha" />
        <FormSelect
          control={form.control}
          label="Ubicación origen"
          name="idUbicacionOrigen"
          options={ubicaciones}
          onChangeExtra={(value) => {
            form.setValue('idUbicacionDestino', value === '1' ? 2 : 1);
          }}
        />
        <FormInputReadOnly value={value} label="Ubicación destino" />
      </FieldSet>
    </FieldGroup>
  );
}
