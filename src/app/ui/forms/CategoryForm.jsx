'use client';

import {
  FormContainer,
  FormInput,
  FormButtons,
  FormId,
  FormError,
} from './FormInputs/formInputs';
import { useActionState } from 'react';
import { createCategory, updateCategory } from '@/app/lib/actions';

export function CategoryForm({ isNew, category }) {
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
      <FormButtons link={'/categorias'} isNew={isNew} isPending={isPending} />
    </FormContainer>
  );
}
