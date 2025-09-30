'use client';

import { ActionType, CategoryFormType } from '@/types/types';
import { startTransition, useActionState } from 'react';
import { createCategory, updateCategory } from '@/server-actions/categories';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from './schemas/form-schemas';
import z from 'zod';
import { Form } from '../ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import FormInput from './form-inputs/form-input';
import { FormButtons, FormError } from './form-inputs/form-inputs';
import { getFormLabels } from '@/utils/get-form-labels';

interface CategoryFormProps {
  action: ActionType;
  category?: CategoryFormType;
}

export function CategoryForm({ action, category }: CategoryFormProps) {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: category
      ? {
          categoria: category.categoria ?? '',
        }
      : {
          categoria: '',
        },
  });

  const newAction =
    action === 'create'
      ? createCategory
      : updateCategory.bind(null, category?.id);
  const [state, formAction, isPending] = useActionState(newAction, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof categorySchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  const { cardTitle, cardAction, cardButton } = getFormLabels(action, 'f');

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-xl w-full">
        <CardHeader className="border-b">
          <CardTitle>{cardTitle} categoría</CardTitle>
          <CardDescription>
            {cardAction} la información de la categoría, haz click en{' '}
            {cardButton} cuando estés listo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormInput
              control={form.control}
              name="categoria"
              label="Categoría"
            />
            <FormError isPending={isPending} state={state} />
            <FormButtons action={action} isPending={isPending} />
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
