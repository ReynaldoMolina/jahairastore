'use client';

import { createCategory, updateCategory } from '@/server-actions/actions';
import { useActionState } from 'react';
import {
  FormError,
  FormButtons,
  FormInput,
  FormContainerNew,
  FormIdNew,
} from './form-inputs/form-inputs';
import { CardContent } from '../ui/card';

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
    <FormContainerNew action={formAction}>
      <FormIdNew
        holder={isNew ? 'Crear categoría' : `Categoría ${category.Id}`}
        description="Ingresa la información de la categoría."
      />
      <CardContent>
        <FormInput
          name="Nombre"
          holder="Nombre"
          value={isNew ? '' : category.Nombre}
          focus={isNew}
        />
        <FormError isPending={isPending} state={state} />
      </CardContent>
      <FormButtons isNew={isNew} isPending={isPending} />
    </FormContainerNew>
  );
}
