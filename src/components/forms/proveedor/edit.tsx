'use client';

import { FormSelectOptions, ProveedorFormType } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { providerSchema } from '../validation/validation-schemas';
import { updateProvider } from '@/server-actions/provider';
import { ProveedorForm } from './form';

interface EditProveedorFormProps {
  proveedor?: ProveedorFormType;
  selectOptions: FormSelectOptions;
}

export function EditProveedorForm({
  proveedor,
  selectOptions,
}: EditProveedorFormProps) {
  const form = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      nombre: proveedor?.nombre ?? '',
      telefono: proveedor?.telefono ?? '+505 ',
      municipio: proveedor?.municipio ?? '',
      direccion: proveedor?.direccion ?? '',
    },
  });

  const [state, formAction, isPending] = useActionState(updateProvider, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof providerSchema>) {
    startTransition(() => {
      formAction({ id: proveedor?.id, values });
    });
  }

  return (
    <ProveedorForm
      action="edit"
      selectOptions={selectOptions}
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      state={state}
    />
  );
}
