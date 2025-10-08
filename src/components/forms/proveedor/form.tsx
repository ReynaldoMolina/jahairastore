'use client';

import {
  FormButtons,
  FormError,
} from '@/components/forms/form-inputs/form-inputs';
import { ActionType, FormSelectOptions } from '@/types/types';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { providerSchema } from '../validation/validation-schemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { FormInputGroup } from '../form-inputs/form-input-group';
import { FormTextArea } from '../form-inputs/form-text-area';
import { getFormLabels } from '@/utils/get-form-labels';
import { FormInput } from '../form-inputs/form-input';
import { FormSelect } from '../form-inputs/form-select';
import { Form } from '../../ui/form';

type ProveedorFormValues = z.infer<typeof providerSchema>;

interface ProvedorFormProps {
  action: ActionType;
  selectOptions: FormSelectOptions;
  form: UseFormReturn<ProveedorFormValues>;
  onSubmit: (values: ProveedorFormValues) => void;
  isPending: boolean;
  state: unknown;
}

export function ProveedorForm({
  action,
  selectOptions,
  form,
  onSubmit,
  isPending,
  state,
}: ProvedorFormProps) {
  const { cardTitle, cardDescription } = getFormLabels({
    action,
    noun: 'm',
    formName: 'proveedor',
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
            <FormInput control={form.control} name="nombre" label="Nombre" />
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
