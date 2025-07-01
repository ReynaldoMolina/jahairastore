import {
  FormContainer,
  FormDiv,
  FormInput,
  FormButtons,
  FormId,
} from '@/app/ui/forms/FormInputs/formInputs';
import { ClientOptions } from '@/app/ui/forms/Options/FormOptions';
import { createClient, updateClient } from '@/app/lib/actions';

export function ClientCreate() {
  return (
    <FormContainer action={createClient}>
      <FormId holder="Crear cliente" />
      <FormInput name="Nombre" holder="Nombre" value="" />
      <FormInput name="Apellido" holder="Apellido" value="" />
      <FormDiv>
        <FormInput
          name="Telefono"
          holder="Telefono"
          value="+505 "
          required={false}
        />
      </FormDiv>
      <FormDiv>
        <FormInput
          name="Pais"
          holder="País"
          value="Nicaragua"
          required={false}
        />
        <FormInput
          name="Departamento"
          holder="Departamento"
          value=""
          required={false}
        />
        <FormInput
          name="Municipio"
          holder="Municipio"
          value=""
          required={false}
        />
      </FormDiv>
      <FormInput
        name="Direccion"
        holder="Dirección"
        value=""
        required={false}
      />
      <FormButtons link={'/clientes'} label={'Crear'} />
    </FormContainer>
  );
}

export function ClientEdit({ client }) {
  const updateClientWithId = updateClient.bind(null, client.Id);

  return (
    <FormContainer action={updateClientWithId}>
      <FormId holder="Cliente" value={client.Id} />
      <FormInput name="Nombre" holder="Nombre" value={client.Nombre} />
      <FormInput name="Apellido" holder="Apellido" value={client.Apellido} />
      <FormDiv>
        <FormInput
          name="Telefono"
          holder="Telefono"
          value={client.Telefono || '+505 '}
          required={false}
        />
      </FormDiv>
      <FormDiv>
        <FormInput
          name="Pais"
          holder="País"
          value={client.Pais}
          required={false}
        />
        <FormInput
          name="Departamento"
          holder="Departamento"
          value={client.Departamento}
          required={false}
        />
        <FormInput
          name="Municipio"
          holder="Municipio"
          value={client.Municipio}
          required={false}
        />
      </FormDiv>
      <FormInput
        name="Direccion"
        holder="Dirección"
        value={client.Direccion}
        required={false}
      />
      <ClientOptions client={client} />
      <FormButtons link={'/clientes'} label={'Guardar'} />
    </FormContainer>
  );
}
