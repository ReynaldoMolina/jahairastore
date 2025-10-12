'use client';

import { CategoryFormType } from '@/types/types';
import { startTransition, useActionState, useEffect } from 'react';
import { updateCategory } from '@/server-actions/category';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '../validation/validation-schemas';
import z from 'zod';
import { CategoriaForm } from './form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { stateDefault } from '@/server-actions/state-messages';

interface EditCategoriaFormProps {
  category?: CategoryFormType;
}

export function EditCategoriaForm({ category }: EditCategoriaFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nombre: category?.nombre ?? '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateCategory,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof categorySchema>) {
    startTransition(() => {
      formAction({ id: category?.id, values });
    });
  }

  useEffect(() => {
    if (state?.success) {
      toast(state.title, {
        description: state.description,
      });
    }
  }, [state]);

  return (
    <CategoriaForm
      action="edit"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
