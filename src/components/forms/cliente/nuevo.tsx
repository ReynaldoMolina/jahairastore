'use client';

import { FormSelectOptions } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { clientSchema } from '../validation/validation-schemas';
import { createClient } from '@/server-actions/client';
import { ClientForm } from './form';
import { stateDefault } from '@/server-actions/state-messages';
import { toast } from 'sonner';

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

  const [state, formAction, isPending] = useActionState(
    createClient,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof clientSchema>) {
    startTransition(() => {
      formAction({ values });
    });
  }

  useEffect(() => {
    if (state.success) {
      toast(state.title, {
        description: state.description,
      });
    }
  }, [state]);

  return (
    <ClientForm
      action="create"
      selectOptions={selectOptions}
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
