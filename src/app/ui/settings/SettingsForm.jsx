'use client';

import { useActionState } from 'react';
import {
  FormButtons,
  FormContainer,
  FormError,
  FormId,
  FormInput,
} from '../forms/FormInputs/formInputs';
import { updateSettings } from '@/app/lib/actions';

export function SettingsForm({ data }) {
  const [state, formAction, isPending] = useActionState(updateSettings, {
    message: '',
  });
  return (
    <FormContainer action={formAction}>
      <FormId holder="Configuración" />
      <FormInput
        name="Nombre_empresa"
        holder="Nombre del negocio"
        value={data.Nombre_empresa || ''}
      />
      <FormInput name="Eslogan" holder="Eslogan" value={data.Eslogan || ''} />
      <FormInput
        name="Mensaje"
        holder="Mensaje personalizado"
        value={data.Mensaje || ''}
      />
      <FormError isPending={isPending} state={state} />
      <FormButtons isNew={false} isPending={isPending} />
    </FormContainer>
  );
}
