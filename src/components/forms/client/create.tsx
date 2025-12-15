'use client';

import { startTransition, useActionState } from 'react';
import { Card, CardContent } from '../../ui/card';
import * as z from 'zod';
import { ClientById } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { stateDefault } from '@/server-actions/stateMessage';
import { clientSchema } from '../validation/client';
import { createClient } from '@/server-actions/client';
import { ClientForm } from './form';

export function CreateClientForm() {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      telefono: '+505 ',
      municipio: 'León',
      departamento: null,
      pais: null,
      direccion: '',
      idUsuario: null,
      imagenUrl: '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    createClient,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof clientSchema>) {
    startTransition(() => {
      formAction({ values: values as ClientById });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/clientes' });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl w-full mx-auto"
      >
        <Card>
          <CardContent>
            <ClientForm form={form} />
          </CardContent>
          <FormCardFooter isNew={true} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
