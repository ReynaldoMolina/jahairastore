import { FormContainer, FormDiv, FormInput, FormButtons, FormId } from "@/app/ui/forms/formInputs";
import { ClientOptions } from "@/app/ui/forms/FormOptions";
import { createClient, updateClient } from "@/app/lib/actions";

export function ClientCreate() {
  return (
    <FormContainer
      action={createClient}>
      <FormId holder="Crear cliente" />
      <FormDiv>
        <FormInput name="Nombre" holder="Nombre" value="" />
        <FormInput name="Apellido" holder="Apellido" value="" />
      </FormDiv>
      <FormDiv>
        <FormInput name="Telefono" holder="Telefono" value="+505 " required={false} />
        <FormInput name="Municipio" holder="Municipio" value="" required={false} />
      </FormDiv>
      <FormDiv>
        <FormInput name="Departamento" holder="Departamento" value="" required={false} />
        <FormInput name="Pais" holder="País" value="" required={false} />
      </FormDiv>
      <FormInput name="Direccion" holder="Dirección" value="" required={false} />
      <FormButtons link={'/clientes'} label={'Crear'} />
    </FormContainer>
  );
}

export function ClientEdit({ client }) {
  const updateClientWithId = updateClient.bind(null, client.Id);  

  return (
    <FormContainer
      action={updateClientWithId}>
      <FormId holder="Cliente" value={client.Id} />
      <FormDiv>
        <FormInput name="Nombre" holder="Nombre" value={client.Nombre} />
        <FormInput name="Apellido" holder="Apellido" value={client.Apellido} />
      </FormDiv>
      <FormDiv>
        <FormInput name="Telefono" holder="Telefono" value={client.Telefono || '+505 '} required={false} />
        <FormInput name="Municipio" holder="Municipio" value={client.Municipio} required={false} />
      </FormDiv>
      <FormDiv>
        <FormInput name="Departamento" holder="Departamento" value={client.Departamento} required={false} />
        <FormInput name="Pais" holder="País" value={client.Pais} required={false} />
      </FormDiv>
      <FormInput name="Direccion" holder="Dirección" value={client.Direccion} required={false} />
      <ClientOptions client={client}/>
      <FormButtons link={'/clientes'} label={'Guardar'} />
    </FormContainer>
  );
}