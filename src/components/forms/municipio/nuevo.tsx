'use client';

import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { createMunicipio } from '@/server-actions/municipio';
import { municipioSchema } from '../validation/validation-schemas';
import { MunicipioForm } from './form';

export function NewMunicipioForm() {
  const form = useForm<z.infer<typeof municipioSchema>>({
    resolver: zodResolver(municipioSchema),
    defaultValues: {
      nombre: '',
    },
  });

  const [state, formAction, isPending] = useActionState(createMunicipio, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof municipioSchema>) {
    startTransition(() => {
      formAction({ values });
    });
  }

  return (
    <MunicipioForm
      action="create"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      state={state}
    />
  );
}
