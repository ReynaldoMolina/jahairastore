'use client';

import { FieldGroup, FieldSeparator, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormInput } from '@/components/form-elements/form-input';
import z from 'zod';
import { FormSelect } from '@/components/form-elements/form-select';
import { providerSchema } from '../validation/provider';

interface ProviderForm {
  form: UseFormReturn<z.infer<typeof providerSchema>>;
}

export function ProviderForm({ form }: ProviderForm) {
  return (
    <FieldGroup>
      <FieldSet>
        <FormInput
          control={form.control}
          name="nombreEmpresa"
          label="Nombre empresa"
        />
      </FieldSet>
      <FieldSet className="sm:flex-row">
        <FormInput
          control={form.control}
          name="nombreContacto"
          label="Contacto"
        />
        <FormInput
          control={form.control}
          name="telefono"
          label="Teléfono"
          textAddon="+505"
        />
      </FieldSet>
      <FieldSet>
        <FormTextArea
          control={form.control}
          name="direccion"
          label="Dirección"
        />
      </FieldSet>
      <FieldSeparator />
      <FormInput control={form.control} name="imagenUrl" label="Foto (url)" />
    </FieldGroup>
  );
}
