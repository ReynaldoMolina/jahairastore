'use client';

import { createProvider, updateProvider } from '@/server-actions/actions';
import { useActionState } from 'react';
import {
  FormContainer,
  FormId,
  FormDiv,
  FormError,
  FormButtons,
  FormInput,
  FormContainerNew,
  FormIdNew,
  FormTextArea,
} from './form-inputs/form-inputs';
import { CardContent } from '../ui/card';
import { FieldGroup, FieldSeparator, FieldSet } from '../ui/field';

interface ProviderForm {
  isNew: boolean;
  provider?: any;
}

export function ProviderForm({ isNew, provider }: ProviderForm) {
  const action = isNew
    ? createProvider
    : updateProvider.bind(null, provider.Id);
  const [state, formAction, isPending] = useActionState(action, {
    message: '',
  });

  return (
    <FormContainerNew action={formAction}>
      <CardContent>
        <FieldGroup>
          <FieldSet>
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
            </FormDiv>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FormDiv flexCol={false}>
              <FormInput
                name="Telefono"
                holder="Teléfono"
                value={isNew ? '+505 ' : provider.Telefono || '+505 '}
                required={false}
              />
              <FormInput
                name="Pais"
                holder="País"
                value={isNew ? 'Nicaragua' : provider.Pais}
                required={false}
              />
            </FormDiv>
            <FormDiv flexCol={false}>
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
          </FieldSet>
          <FormTextArea
            name="Direccion"
            value={isNew ? '' : provider.Direccion}
            label="Dirección"
            required={false}
          />
        </FieldGroup>
        <FormError isPending={isPending} state={state} />
      </CardContent>
      <FormButtons isNew={isNew} isPending={isPending} />
    </FormContainerNew>
  );
}
