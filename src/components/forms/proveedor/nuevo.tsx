'use client';

import { FormSelectOptions } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { providerSchema } from '../validation/validation-schemas';
import { createProvider } from '@/server-actions/provider';
import { ProveedorForm } from './form';

interface NewProveedorFormProps {
  selectOptions: FormSelectOptions;
}

export function NewProveedorForm({ selectOptions }: NewProveedorFormProps) {
  const form = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      nombre: '',
      telefono: '+505 ',
      municipio: '',
      direccion: '',
    },
  });

  const [state, formAction, isPending] = useActionState(createProvider, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof providerSchema>) {
    startTransition(() => {
      formAction({ values });
    });
  }

  return (
    <ProveedorForm
      action="create"
      selectOptions={selectOptions}
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      state={state}
    />
  );
}
