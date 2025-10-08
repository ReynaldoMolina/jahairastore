'use client';

import { CategoryFormType } from '@/types/types';
import { startTransition, useActionState } from 'react';
import { updateCategory } from '@/server-actions/category';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '../validation/validation-schemas';
import z from 'zod';
import { CategoriaForm } from './form';

interface EditCategoriaFormProps {
  category?: CategoryFormType;
}

export function EditCategoriaForm({ category }: EditCategoriaFormProps) {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nombre: category?.nombre ?? '',
    },
  });

  const [state, formAction, isPending] = useActionState(updateCategory, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof categorySchema>) {
    startTransition(() => {
      formAction({ id: category?.id, values });
    });
  }

  return (
    <CategoriaForm
      action="edit"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      state={state}
    />
  );
}
