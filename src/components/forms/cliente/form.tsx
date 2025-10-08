'use client';

import {
  FormButtons,
  FormError,
} from '@/components/forms/form-inputs/form-inputs';
import { ActionType, FormSelectOptions } from '@/types/types';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { clientSchema } from '../validation/validation-schemas';
import { getFormLabels } from '@/utils/get-form-labels';
import { Form } from '@/components/ui/form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { FormInputGroup } from '../form-inputs/form-input-group';
import { FormTextArea } from '../form-inputs/form-text-area';
import { FormInput } from '../form-inputs/form-input';
import { FormSelect } from '../form-inputs/form-select';

type ClienteFormValues = z.infer<typeof clientSchema>;

interface ClientFormProps {
  action: ActionType;
  selectOptions: FormSelectOptions;
  form: UseFormReturn<ClienteFormValues>;
  onSubmit: (values: ClienteFormValues) => void;
  isPending: boolean;
  state: unknown;
}

export function ClientForm({
  action,
  selectOptions,
  form,
  onSubmit,
  isPending,
  state,
}: ClientFormProps) {
  const { cardTitle, cardDescription } = getFormLabels({
    action,
    noun: 'm',
    formName: 'cliente',
  });

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-2xl w-full">
        <CardHeader className="border-b">
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormInputGroup>
              <FormInput control={form.control} name="nombre" label="Nombre" />
              <FormInput
                control={form.control}
                name="apellido"
                label="Apellido"
              />
            </FormInputGroup>
            <FormInputGroup>
              <FormInput
                control={form.control}
                name="telefono"
                label="Teléfono"
              />
              <FormSelect
                control={form.control}
                name="municipio"
                label="Municipio"
                options={selectOptions.municipios ?? []}
              />
            </FormInputGroup>
            <FormTextArea
              control={form.control}
              name="direccion"
              label="Dirección"
            />
            <FormError isPending={isPending} state={state} />
            <FormButtons action={action} isPending={isPending} />
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
