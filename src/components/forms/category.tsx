'use client';

import { createCategory, updateCategory } from '@/server-actions/actions';
import { useActionState } from 'react';
import {
  FormContainer,
  FormId,
  FormError,
  FormButtons,
  FormInput,
} from './form-inputs/form-inputs';

interface CategoryForm {
  isNew: boolean;
  category?: any;
}

export function CategoryForm({ isNew, category }: CategoryForm) {
  const action = isNew
    ? createCategory
    : updateCategory.bind(null, category.Id);
  const [state, formAction, isPending] = useActionState(action, {
    message: '',
  });

  return (
    <FormContainer action={formAction}>
      <FormId
        holder={isNew ? 'Crear categoría' : 'Categoría'}
        value={isNew ? '' : category.Id}
      />
      <FormInput
        name="Nombre"
        holder="Nombre"
        value={isNew ? '' : category.Nombre}
        focus={isNew}
      />
      <FormError isPending={isPending} state={state} />
      <FormButtons isNew={isNew} isPending={isPending} />
    </FormContainer>
  );
}
