'use client';

import { ActionType } from '@/types/types';
import { UseFormReturn } from 'react-hook-form';
import { Form } from '../../ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { FormInput } from '../form-inputs/form-input';
import { FormButtons, FormError } from '../form-inputs/form-inputs';
import { getFormLabels } from '@/utils/get-form-labels';
import z from 'zod';
import { categorySchema } from '../validation/validation-schemas';

type CategoriaFormValues = z.infer<typeof categorySchema>;

interface CategoriaFormProps {
  action: ActionType;
  form: UseFormReturn<CategoriaFormValues>;
  onSubmit: (values: CategoriaFormValues) => void;
  isPending: boolean;
  state: unknown;
}

export function CategoriaForm({
  action,
  form,
  onSubmit,
  isPending,
  state,
}: CategoriaFormProps) {
  const { cardTitle, cardDescription } = getFormLabels({
    action,
    noun: 'f',
    formName: 'categoría',
  });

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-xl w-full">
        <CardHeader className="border-b">
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormInput control={form.control} name="nombre" label="Categoría" />
            <FormError isPending={isPending} state={state} />
            <FormButtons action={action} isPending={isPending} />
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
