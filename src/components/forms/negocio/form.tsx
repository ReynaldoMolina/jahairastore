'use client';

import { FormButtons, FormError } from '../form-inputs/form-inputs';
import { ActionType } from '@/types/types';
import { Form } from '../../ui/form';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { FormInput } from '../form-inputs/form-input';
import { FormTextArea } from '../form-inputs/form-text-area';
import { negocioSchema } from '../validation/validation-schemas';
import { getFormLabels } from '@/utils/get-form-labels';

type NegocioFormValues = z.infer<typeof negocioSchema>;

interface NegocioFormProps {
  action: ActionType;
  form: UseFormReturn<NegocioFormValues>;
  onSubmit: (values: NegocioFormValues) => void;
  isPending: boolean;
  state: unknown;
}

export function NegocioForm({
  action,
  form,
  onSubmit,
  isPending,
  state,
}: NegocioFormProps) {
  const { cardDescription } = getFormLabels({
    action,
    noun: 'm',
    formName: 'negocio',
  });

  return (
    <main className="flex flex-col gap-4 items-center">
      <Form {...form}>
        <Card className="w-full mx-auto max-w-2xl">
          <CardHeader className="border-b">
            <CardTitle>Información del negocio</CardTitle>
            <CardDescription>{cardDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormInput control={form.control} name="nombre" label="Nombre" />
              <FormInput
                control={form.control}
                name="eslogan"
                label="Eslogan"
              />
              <FormTextArea
                control={form.control}
                name="mensaje"
                label="Mensaje"
              />
              <FormError isPending={isPending} state={state} />
              <FormButtons action={action} isPending={isPending} />
            </form>
          </CardContent>
        </Card>
      </Form>
    </main>
  );
}
