'use client';

import { startTransition, useActionState, useEffect } from 'react';
import { createCategory } from '@/server-actions/category';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '../validation/validation-schemas';
import z from 'zod';
import { CategoriaForm } from './form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { stateDefault } from '@/server-actions/state-messages';

export function NewCategoriaForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nombre: '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    createCategory,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof categorySchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  useEffect(() => {
    if (state.success) {
      toast(state.title, {
        description: state.description,
      });
    }
  }, [state]);

  return (
    <CategoriaForm
      action="create"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
