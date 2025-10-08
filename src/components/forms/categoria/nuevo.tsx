'use client';

import { startTransition, useActionState } from 'react';
import { createCategory } from '@/server-actions/category';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '../validation/validation-schemas';
import z from 'zod';
import { CategoriaForm } from './form';

export function NewCategoriaForm() {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nombre: '',
    },
  });

  const [state, formAction, isPending] = useActionState(createCategory, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof categorySchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  return (
    <CategoriaForm
      action="create"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      state={state}
    />
  );
}
