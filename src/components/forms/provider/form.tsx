'use client';

import { FieldGroup, FieldSeparator, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormInput } from '@/components/form-elements/form-input';
import z from 'zod';
import { providerSchema } from '../validation/provider';

interface ProviderForm {
  form: UseFormReturn<z.infer<typeof providerSchema>>;
}

export function ProviderForm({ form }: ProviderForm) {
  return (
    <FieldGroup>
      <FieldSet>
        <FormInput control={form.control} name="nombreEmpresa" label="Nombre" />
        <FormInput
          control={form.control}
          name="telefono"
          label="Teléfono"
          textAddon="+505"
        />
        <FormTextArea
          control={form.control}
          name="direccion"
          label="Dirección"
        />
      </FieldSet>
    </FieldGroup>
  );
}
