'use client';

import { MunicipioType } from '@/types/types';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { updateMunicipio } from '@/server-actions/municipio';
import { municipioSchema } from '../validation/validation-schemas';
import { MunicipioForm } from './form';

interface EditMunicipioFormProps {
  municipio?: MunicipioType;
}

export function EditMunicipioForm({ municipio }: EditMunicipioFormProps) {
  const form = useForm<z.infer<typeof municipioSchema>>({
    resolver: zodResolver(municipioSchema),
    defaultValues: {
      nombre: municipio?.nombre ?? '',
    },
  });

  const [state, formAction, isPending] = useActionState(updateMunicipio, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof municipioSchema>) {
    startTransition(() => {
      formAction({ id: municipio?.id, values });
    });
  }

  return (
    <MunicipioForm
      action="edit"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      state={state}
    />
  );
}
