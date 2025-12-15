'use client';

import { FieldGroup, FieldSet } from '../../ui/field';
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
        <FormInput
          control={form.control}
          name="nombreContacto"
          label="Contacto"
        />
      </FieldSet>
      <FieldSet className="flex-row gap-3 md:gap-6">
        <FormInput
          control={form.control}
          name="telefono"
          label="Teléfono"
          textAddon="+505"
        />
        <FormSelect
          control={form.control}
          name="municipio"
          label="Municipio"
          options={[
            {
              value: 'León',
              label: 'León',
            },
            {
              value: 'Managua',
              label: 'Managua',
            },
            {
              value: 'Acoyapa',
              label: 'Acoyapa',
            },
          ]}
        />
      </FieldSet>
      <FieldSet>
        <FormTextArea
          control={form.control}
          name="direccion"
          label="Dirección"
        />
      </FieldSet>
    </FieldGroup>
  );
}
