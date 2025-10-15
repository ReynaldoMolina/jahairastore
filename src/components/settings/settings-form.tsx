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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FieldGroup, FieldSet } from '../ui/field';

export function SettingsForm({ data }) {
  const [state, formAction, isPending] = useActionState(updateSettings, {
    message: '',
  });

  return (
    <main className="flex flex-col gap-4 items-center">
      <FormContainer action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle>Información del negocio</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <FieldSet>
                <FormInput
                  name="Nombre_empresa"
                  holder="Nombre"
                  value={data.Nombre_empresa || ''}
                />
                <FormInput
                  name="Eslogan"
                  holder="Eslogan"
                  value={data.Eslogan || ''}
                />
                <FormInput
                  name="Mensaje"
                  holder="Mensaje personalizado"
                  value={data.Mensaje || ''}
                  required={false}
                />
              </FieldSet>
            </FieldGroup>
          </CardContent>
          <FormError isPending={isPending} state={state} />
          <FormButtons isNew={false} isPending={isPending} />
        </Card>
      </FormContainer>
    </main>
  );
}
