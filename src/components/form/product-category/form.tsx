'use client';

import { FieldGroup, FieldSet } from '../../ui/field';
import { UseFormReturn } from 'react-hook-form';
import { FormInput } from '@/components/form-element/form-input';
import z from 'zod';
import { categorySchema } from '../validation/product-category';

interface Props {
  form: UseFormReturn<z.infer<typeof categorySchema>>;
}

export function CategoryForm({ form }: Props) {
  return (
    <FieldGroup>
      <FieldSet className="sm:flex-row">
        <FormInput control={form.control} name="nombre" label="Nombre" />
      </FieldSet>
    </FieldGroup>
  );
}
