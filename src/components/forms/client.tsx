'use client';

import {
  FormButtons,
  FormError,
} from '@/components/forms/form-inputs/form-inputs';
import { createClient, updateClient } from '@/server-actions/clients';
import { ActionType, ClientFormType } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { clientSchema } from './schemas/form-schemas';
import { Form } from '../ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import FormInput from './form-inputs/form-input';
import FormTextArea from './form-inputs/form-text-area';
import { FormSelect } from './form-inputs/form-select';
import { getFormLabels } from '@/utils/get-form-labels';
import FormInputGroup from './form-inputs/form-input-group';

interface ClientFormProps {
  action: ActionType;
  client?: ClientFormType;
}

export function ClientForm({ action, client }: ClientFormProps) {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: client
      ? {
          nombre: client.nombre ?? '',
          apellido: client.apellido ?? '',
          telefono: client.telefono ?? '',
          municipio: client.municipio ?? '',
          direccion: client.direccion ?? '',
        }
      : {
          nombre: '',
          apellido: '',
          telefono: '+505 ',
          municipio: '',
          direccion: '',
        },
  });

  const newAction =
    action === 'create' ? createClient : updateClient.bind(null, client?.id);
  const [state, formAction, isPending] = useActionState(newAction, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof clientSchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  const { cardTitle, cardAction, cardButton } = getFormLabels(action, 'm');

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-2xl w-full">
        <CardHeader className="border-b">
          <CardTitle>{cardTitle} cliente</CardTitle>
          <CardDescription>
            {cardAction} la información del cliente, haz click en {cardButton}{' '}
            cuando estés listo.
          </CardDescription>
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
                options={[
                  { value: 'León', label: 'León' },
                  { value: 'Acoyapa', label: 'Acoyapa' },
                ]}
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
