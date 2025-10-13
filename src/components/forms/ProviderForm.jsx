'use client';

import {
  FormContainer,
  FormDiv,
  FormInput,
  FormButtons,
  FormId,
  FormError,
} from '@/app/ui/forms/FormInputs/formInputs';
import { useActionState } from 'react';
import { createProvider, updateProvider } from '@/app/lib/actions';

export function ProviderForm({ isNew, provider }) {
  const action = isNew
    ? createProvider
    : updateProvider.bind(null, provider.Id);
  const [state, formAction, isPending] = useActionState(action, {
    message: '',
  });

  return (
    <FormContainer action={formAction}>
      <FormId
        holder={isNew ? 'Crear proveedor' : 'Proveedor'}
        value={isNew ? '' : provider.Id}
      />
      <FormInput
        name="Nombre_empresa"
        holder="Nombre empresa"
        value={isNew ? '' : provider.Nombre_empresa}
        focus={isNew}
      />
      <FormDiv>
        <FormInput
          name="Nombre_contacto"
          holder="Contacto"
          value={isNew ? '' : provider.Nombre_contacto}
          required={false}
        />
        <FormInput
          name="Telefono"
          holder="Teléfono"
          value={isNew ? '+505 ' : provider.Telefono || '+505 '}
          required={false}
        />
      </FormDiv>
      <FormDiv>
        <FormInput
          name="Pais"
          holder="País"
          value={isNew ? 'Nicaragua' : provider.Pais}
          required={false}
        />
        <FormInput
          name="Municipio"
          holder="Municipio"
          value={isNew ? '' : provider.Municipio}
          required={false}
        />
        <FormInput
          name="Departamento"
          holder="Departamento"
          value={isNew ? '' : provider.Departamento}
          required={false}
        />
      </FormDiv>
      <FormInput
        name="Direccion"
        holder="Dirección"
        value={isNew ? '' : provider.Direccion}
        required={false}
      />
      <FormError isPending={isPending} state={state} />
      <FormButtons isNew={isNew} isPending={isPending} />
    </FormContainer>
  );
}
