'use client';

import { FieldGroup, FieldSeparator, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormTextArea } from '@/components/form-element/form-text-area';
import { FormInput } from '@/components/form-element/form-input';
import z from 'zod';
import { clientSchema } from '../validation/client';

interface ClientForm {
  form: UseFormReturn<z.infer<typeof clientSchema>>;
}

export function ClientForm({ form }: ClientForm) {
  return (
    <FieldGroup>
      <FieldSet className="sm:flex-row">
        <FormInput control={form.control} name="nombre" label="Nombre" />
        <FormInput control={form.control} name="apellido" label="Apellido" />
      </FieldSet>
      <FieldSet>
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
