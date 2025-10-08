'use client';

import { ClienteFormType, FormSelectOptions } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { clientSchema } from '../validation/validation-schemas';
import { createClient, updateClient } from '@/server-actions/client';
import { ClientForm } from './form';

interface NewClientFormProps {
  selectOptions: FormSelectOptions;
}

export function NewClientForm({ selectOptions }: NewClientFormProps) {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      telefono: '+505 ',
      municipio: 'León',
      direccion: '',
    },
  });

  const [state, formAction, isPending] = useActionState(createClient, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof clientSchema>) {
    startTransition(() => {
      formAction({ values });
    });
  }

  return (
    <ClientForm
      action="create"
      selectOptions={selectOptions}
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      state={state}
    />
  );
}
