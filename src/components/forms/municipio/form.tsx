'use client';

import { ActionType } from '@/types/types';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { getFormLabels } from '@/utils/get-form-labels';
import { municipioSchema } from '../validation/validation-schemas';
import { Form } from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormError, FormButtons } from '../form-inputs/form-inputs';
import { FormInput } from '../form-inputs/form-input';

type MunicipioFormValues = z.infer<typeof municipioSchema>;

interface MunicipioFormProps {
  action: ActionType;
  form: UseFormReturn<MunicipioFormValues>;
  onSubmit: (values: MunicipioFormValues) => void;
  isPending: boolean;
  state: unknown;
}

export function MunicipioForm({
  action,
  form,
  onSubmit,
  isPending,
  state,
}: MunicipioFormProps) {
  const { cardTitle, cardDescription } = getFormLabels({
    action,
    noun: 'm',
    formName: 'municipio',
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
            <FormInput control={form.control} name="nombre" label="Municipio" />
            <FormError isPending={isPending} state={state} />
            <FormButtons action={action} isPending={isPending} />
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
