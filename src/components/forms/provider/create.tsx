'use client';

import { startTransition, useActionState } from 'react';
import { Card, CardContent } from '../../ui/card';
import * as z from 'zod';
import { ProviderById } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerActionFeedback } from '@/hooks/use-server-status';
import { FormCardFooter } from '@/components/form-elements/form-footer';
import { Form } from '@/components/ui/form';
import { stateDefault } from '@/server-actions/stateMessage';
import { providerSchema } from '../validation/provider';
import { createProvider } from '@/server-actions/provider';
import { ProviderForm } from './form';

export function CreateProviderForm() {
  const form = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      nombreEmpresa: '',
      nombreContacto: '',
      telefono: '',
      municipio: 'León',
      departamento: null,
      pais: null,
      direccion: '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    createProvider,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof providerSchema>) {
    startTransition(() => {
      formAction({ values: values as ProviderById });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/proveedores' });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl w-full mx-auto"
      >
        <Card>
          <CardContent>
            <ProviderForm form={form} />
          </CardContent>
          <FormCardFooter isNew={true} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
