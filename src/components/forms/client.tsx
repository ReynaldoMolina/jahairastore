'use client';

import {
  FormButtons,
  FormError,
} from '@/components/forms/form-inputs/form-inputs';
import { createClient, updateClient } from '@/server-actions/clients';
import { ClientFormType } from '@/types/types';
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

interface ClientFormProps {
  isNew: boolean;
  client?: ClientFormType;
}

export function ClientForm({ isNew, client }: ClientFormProps) {
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

  const action = isNew ? createClient : updateClient.bind(null, client?.id);
  const [state, formAction, isPending] = useActionState(action, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof clientSchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-xl w-full">
        <CardHeader className="border-b">
          <CardTitle>Editar cliente</CardTitle>
          <CardDescription>
            Edita la información del cliente, haz click en guardar cuando estés
            listo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormInput control={form.control} name="nombre" label="Nombre" />
            <FormInput
              control={form.control}
              name="apellido"
              label="Apellido"
            />
            <FormInput
              control={form.control}
              name="telefono"
              label="Teléfono"
            />
            <FormSelect
              control={form.control}
              name="municipio"
              label="Municipio"
              options={[{ value: 'León', label: 'León' }]}
            />
            <FormTextArea
              control={form.control}
              name="direccion"
              label="Dirección"
            />
            <FormError isPending={isPending} state={state} />
            <FormButtons isNew={false} isPending={isPending} />
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
