'use client';

import { useActionState } from 'react';
import {
  FormButtons,
  FormContainer,
  FormId,
  FormError,
  FormInput,
} from '../forms/FormInputs/formInputs';
import { updateSettings } from '@/server-actions/actions';
import { BusinessInfoType } from '@/types/types';

export function SettingsForm({ data }: { data: BusinessInfoType }) {
  const [state, formAction, isPending] = useActionState(updateSettings, {
    message: '',
  });

  return (
    <main className="flex flex-col gap-4 items-center">
      <FormContainer action={formAction}>
        <FormId holder="Información del negocio" />
        <FormInput
          name="nombre_empresa"
          holder="Nombre"
          value={data.nombre_empresa || ''}
        />
        <FormInput name="eslogan" holder="Eslogan" value={data.eslogan || ''} />
        <FormInput
          name="mensaje"
          holder="Mensaje personalizado"
          value={data.mensaje || ''}
          required={false}
        />
        <FormError isPending={isPending} state={state} />
        <FormButtons isNew={false} isPending={isPending} />
      </FormContainer>
    </main>
  );
}
