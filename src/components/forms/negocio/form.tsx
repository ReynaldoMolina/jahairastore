'use client';

import { FormButtons } from '../form-inputs/form-inputs';
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
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';

type NegocioFormValues = z.infer<typeof negocioSchema>;

interface NegocioFormProps {
  action: ActionType;
  form: UseFormReturn<NegocioFormValues>;
  onSubmit: (values: NegocioFormValues) => void;
  isPending: boolean;
}

export function NegocioForm({
  action,
  form,
  onSubmit,
  isPending,
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
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Datos generales</FieldLegend>
                  <FieldDescription>
                    Escribe la Información de tu negocio.
                  </FieldDescription>
                  <FormInput
                    control={form.control}
                    name="nombre"
                    label="Nombre del negocio"
                  />
                  <FormInput
                    control={form.control}
                    name="eslogan"
                    label="Eslogan"
                  />
                </FieldSet>
                <FieldSeparator />
                <FieldSet>
                  <FieldLegend>Página de inicio</FieldLegend>
                  <FieldDescription>
                    Este mensaje aparecerá en la pantalla de inicio.
                  </FieldDescription>
                  <FormTextArea
                    control={form.control}
                    name="mensaje"
                    label="Mensaje"
                  />
                </FieldSet>
              </FieldGroup>
              <FormButtons action={action} isPending={isPending} />
            </form>
          </CardContent>
        </Card>
      </Form>
    </main>
  );
}
