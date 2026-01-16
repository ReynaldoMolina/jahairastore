'use client';

import { startTransition, useActionState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import * as z from 'zod';
import { ClientById } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-element/form-footer';
import { Form } from '@/components/ui/form';
import { stateDefault } from '@/server-actions/stateMessage';
import { clientSchema } from '../validation/client';
import { updateClient } from '@/server-actions/client';
import { ClientForm } from './form';

interface EditClientForm {
  client: ClientById;
}

export function EditClientForm({ client }: EditClientForm) {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      nombre: client.nombre,
      apellido: client.apellido,
      telefono: client.telefono || '',
      direccion: client.direccion,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateClient,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof clientSchema>) {
    startTransition(() => {
      formAction({ id: client.id, values: values as ClientById });
    });
  }

  useServerActionFeedback(state, { refresh: true });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl w-full mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Editar cliente</CardTitle>
            <CardDescription>Edita la información del cliente.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ClientForm form={form} />
          </CardContent>
          <FormCardFooter isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
