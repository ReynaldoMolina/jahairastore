'use client';

import { createClient, updateClient } from '@/server-actions/actions';
import { useActionState } from 'react';
import {
  FormContainer,
  FormId,
  FormDiv,
  FormError,
  FormButtons,
  FormInput,
} from './form-inputs/form-inputs';
import { ClientOptions } from './options/form-options';

interface ClientForm {
  isNew: boolean;
  client?: any;
}

export function ClientForm({ isNew, client }: ClientForm) {
  const action = isNew ? createClient : updateClient.bind(null, client.Id);
  const [state, formAction, isPending] = useActionState(action, {
    message: '',
  });

  return (
    <FormContainer action={formAction}>
      <FormId
        holder={isNew ? 'Crear cliente' : 'Cliente'}
        value={isNew ? '' : client.Id}
      />
      <FormDiv>
        <FormInput
          name="Nombre"
          holder="Nombre"
          value={isNew ? '' : client.Nombre}
          focus={isNew}
        />
        <FormInput
          name="Apellido"
          holder="Apellido"
          value={isNew ? '' : client.Apellido}
        />
      </FormDiv>
      <FormDiv>
        <FormInput
          name="Telefono"
          holder="Telefono"
          value={isNew ? '+505 ' : client.Telefono || '+505 '}
          required={false}
        />
        <FormInput
          name="Pais"
          holder="País"
          value={isNew ? 'Nicaragua' : client.Pais}
          required={false}
        />
      </FormDiv>
      <FormDiv>
        <FormInput
          name="Departamento"
          holder="Departamento"
          value={isNew ? '' : client.Departamento}
          required={false}
        />
        <FormInput
          name="Municipio"
          holder="Municipio"
          value={isNew ? '' : client.Municipio}
          required={false}
        />
      </FormDiv>
      <FormInput
        name="Direccion"
        holder="Dirección"
        value={isNew ? '' : client.Direccion}
        required={false}
      />
      {!isNew && <ClientOptions client={client} />}
      <FormError isPending={isPending} state={state} />
      <FormButtons isNew={isNew} isPending={isPending} />
    </FormContainer>
  );
}
