'use client';

import { startTransition, useActionState } from 'react';
import { NegocioFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { negocioSchema } from '../validation/validation-schemas';
import { updateNegocio } from '@/server-actions/negocio';
import { NegocioForm } from './form';

interface EditNegocioFormProps {
  negocio: NegocioFormType;
}

export function EditNegocioForm({ negocio }: EditNegocioFormProps) {
  const form = useForm<z.infer<typeof negocioSchema>>({
    resolver: zodResolver(negocioSchema),
    defaultValues: {
      nombre: negocio.nombre ?? '',
      eslogan: negocio.eslogan ?? '',
      mensaje: negocio.mensaje ?? '',
    },
  });

  const [state, formAction, isPending] = useActionState(updateNegocio, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof negocioSchema>) {
    startTransition(() => {
      formAction(values);
    });
  }

  return (
    <NegocioForm
      action="edit"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      state={state}
    />
  );
}
