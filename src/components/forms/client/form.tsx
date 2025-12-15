'use client';

import { FieldGroup, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormInput } from '@/components/form-elements/form-input';
import z from 'zod';
import { clientSchema } from '../validation/client';
import { FormSelect } from '@/components/form-elements/form-select';

interface ClientForm {
  form: UseFormReturn<z.infer<typeof clientSchema>>;
}

export function ClientForm({ form }: ClientForm) {
  return (
    <FieldGroup>
      <FieldSet>
        <FormInput control={form.control} name="nombre" label="Nombre" />
        <FormInput control={form.control} name="apellido" label="Apellido" />
      </FieldSet>
      <FieldSet className="flex-row gap-3 md:gap-6">
        <FormInput control={form.control} name="telefono" label="Teléfono" />
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
        <FormInput
          control={form.control}
          name="imagenUrl"
          label="Foto (link)"
        />
      </FieldSet>
    </FieldGroup>
  );
}
