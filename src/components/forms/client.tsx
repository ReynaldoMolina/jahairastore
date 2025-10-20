'use client';

import { createClient, updateClient } from '@/server-actions/actions';
import { useActionState } from 'react';
import {
  FormDiv,
  FormError,
  FormButtons,
  FormInput,
  FormContainerNew,
  FormIdNew,
  FormTextArea,
} from './form-inputs/form-inputs';
import { ClientOptions } from './options/form-options';
import { FieldGroup, FieldLegend, FieldSeparator, FieldSet } from '../ui/field';
import { CardContent } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';

const municipios = [
  {
    Id: 'León',
    Nombre: 'León',
  },
  {
    Id: 'Managua',
    Nombre: 'Managua',
  },
  {
    Id: 'Acoyapa',
    Nombre: 'Acoyapa',
  },
];

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
    <FormContainerNew action={formAction}>
      <FormIdNew
        holder={isNew ? 'Crear cliente' : 'Cliente'}
        value={isNew ? '' : client.Id}
      />
      <CardContent>
        <FieldGroup>
          <FieldSet>
            <FormDiv flexCol={false}>
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
            <FormInput
              name="Telefono"
              holder="Teléfono"
              value={isNew ? '+505 ' : client.Telefono || '+505 '}
              required={false}
            />
          </FieldSet>
          {/* <FormDiv>
            <FormInput
              name="Pais"
              holder="País"
              value={isNew ? 'Nicaragua' : client.Pais}
              required={false}
            />
          </FormDiv> */}
          <FieldSet>
            <FormDiv>
              {/* <FormInput
              name="Departamento"
              holder="Departamento"
              value={isNew ? '' : client.Departamento}
              required={false}
            /> */}
              {/* <FormSelect
                name="Municipio"
                value={client.Municipio}
                data={[
                  {
                    Id: 'León',
                    Nombre: 'León',
                  },
                  {
                    Id: 'Managua',
                    Nombre: 'Managua',
                  },
                  {
                    Id: 'Acoyapa',
                    Nombre: 'Acoyapa',
                  },
                ]}
              /> */}
              <div className="space-y-3 w-full">
                <Label htmlFor="Municipio">Municipio</Label>
                <Select
                  defaultValue={isNew ? 'León' : client.Municipio}
                  name="Municipio"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {municipios.map((e) => (
                      <SelectItem key={e.Id} value={e.Id}>
                        {e.Nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormDiv>
            <FormTextArea
              name="Direccion"
              value={isNew ? '' : client.Direccion}
              label="Dirección"
              required={false}
            />
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Opciones</FieldLegend>
            {!isNew && <ClientOptions client={client} />}
          </FieldSet>
        </FieldGroup>
        <FormError isPending={isPending} state={state} />
      </CardContent>
      <FormButtons isNew={isNew} isPending={isPending} />
    </FormContainerNew>
  );
}
