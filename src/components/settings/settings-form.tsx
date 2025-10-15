'use client';

import { useActionState } from 'react';
import {
  FormButtons,
  FormContainer,
  FormId,
  FormError,
  FormInput,
} from '../forms/form-inputs/form-inputs';
import { updateSettings } from '@/server-actions/actions';

export function SettingsForm({ data }) {
  const [state, formAction, isPending] = useActionState(updateSettings, {
    message: '',
  });

  return (
    <main className="flex flex-col gap-4 items-center">
      <FormContainer action={formAction}>
        <FormId holder="Información del negocio" />
        <FormInput
          name="Nombre_empresa"
          holder="Nombre"
          value={data.Nombre_empresa || ''}
        />
        <FormInput name="Eslogan" holder="Eslogan" value={data.Eslogan || ''} />
        <FormInput
          name="Mensaje"
          holder="Mensaje personalizado"
          value={data.Mensaje || ''}
          required={false}
        />
        <FormError isPending={isPending} state={state} />
        <FormButtons isNew={false} isPending={isPending} />
      </FormContainer>
    </main>
  );
}
