'use client';

import { startTransition, useActionState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import * as z from 'zod';
import { CategoryById } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-element/form-footer';
import { Form } from '@/components/ui/form';
import { stateDefault } from '@/server-actions/stateMessage';
import { categorySchema } from '../validation/product-category';
import { CategoryForm } from './form';
import { updateCategory } from '@/server-actions/product-category';

interface Props {
  category: CategoryById;
}

export function EditCategoryForm({ category }: Props) {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nombre: category.nombre,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateCategory,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof categorySchema>) {
    startTransition(() => {
      formAction({ id: category.id, values: values as CategoryById });
    });
  }

  useServerActionFeedback(state, { refresh: true });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl w-full mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Editar categoría</CardTitle>
            <CardDescription>
              Edita la información de la categoría.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <CategoryForm form={form} />
          </CardContent>
          <FormCardFooter isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
