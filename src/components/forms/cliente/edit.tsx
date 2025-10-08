'use client';

import { ClienteFormType, FormSelectOptions } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { clientSchema } from '../validation/validation-schemas';
import { updateClient } from '@/server-actions/client';
import { ClientForm } from './form';

interface EditClientFormProps {
  client?: ClienteFormType;
  selectOptions: FormSelectOptions;
}

export function EditClientForm({ client, selectOptions }: EditClientFormProps) {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      nombre: client?.nombre ?? '',
      apellido: client?.apellido ?? '',
      telefono: client?.telefono ?? '+505 ',
      municipio: client?.municipio ?? '',
      direccion: client?.direccion ?? '',
    },
  });

  const [state, formAction, isPending] = useActionState(updateClient, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof clientSchema>) {
    startTransition(() => {
      formAction({ id: client?.id, values });
    });
  }

  return (
    <ClientForm
      action="edit"
      selectOptions={selectOptions}
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      state={state}
    />
  );
}
