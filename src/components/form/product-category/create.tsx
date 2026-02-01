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
import { createCategory } from '@/server-actions/product-category';
import { CategoryForm } from './form';

export function CreateCategoryForm() {
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
      formAction({ values: values as CategoryById });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/categorias' });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl w-full mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Crear Categoría</CardTitle>
            <CardDescription>
              Agrega la información de la categoría.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryForm form={form} />
          </CardContent>
          <FormCardFooter isNew={true} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
