'use client';

import {
  FormButtons,
  FormError,
} from '@/components/forms/form-inputs/form-inputs';
import { ActionType, ProviderFormType } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { providerSchema } from './schemas/form-schemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import FormInputGroup from './form-inputs/form-input-group';
import FormTextArea from './form-inputs/form-text-area';
import { getFormLabels } from '@/utils/get-form-labels';
import FormInput from './form-inputs/form-input';
import { FormSelect } from './form-inputs/form-select';
import { municipios } from '@/utils/municipios';
import { Form } from '../ui/form';
import { createProvider, updateProvider } from '@/server-actions/providers';

interface ProviderFormProps {
  action: ActionType;
  provider?: ProviderFormType;
}

export function ProviderForm({ action, provider }: ProviderFormProps) {
  const form = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema),
    defaultValues: provider
      ? {
          nombre_empresa: provider.nombre_empresa ?? '',
          nombre_contacto: provider.nombre_contacto ?? '',
          telefono: provider.telefono ?? '',
          municipio: provider.municipio ?? '',
          direccion: provider.direccion ?? '',
        }
      : {
          nombre_empresa: '',
          nombre_contacto: '',
          telefono: '+505 ',
          municipio: '',
          direccion: '',
        },
  });

  const newAction =
    action === 'create'
      ? createProvider
      : updateProvider.bind(null, provider?.id);
  const [state, formAction, isPending] = useActionState(newAction, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof providerSchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  const { cardTitle, cardDescription } = getFormLabels(
    action,
    'm',
    'proveedor'
  );

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
            <FormInput
              control={form.control}
              name="nombre_empresa"
              label="Nombre empresa"
            />
            <FormInput
              control={form.control}
              name="nombre_contacto"
              label="Nombre contacto"
            />
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
                options={municipios}
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
