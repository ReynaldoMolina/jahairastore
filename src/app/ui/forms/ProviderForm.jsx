import {
  FormContainer,
  FormDiv,
  FormInput,
  FormButtons,
  FormId,
} from '@/app/ui/forms/FormInputs/formInputs';
import { createProvider, updateProvider } from '@/app/lib/actions';

export function ProviderCreate() {
  return (
    <FormContainer action={createProvider}>
      <FormId holder="Crear proveedor" />
      <FormInput name="Nombre_empresa" holder="Nombre empresa" value="" />
      <FormDiv>
        <FormInput
          name="Nombre_contacto"
          holder="Contacto"
          value=""
          required={false}
        />
        <FormInput
          name="Telefono"
          holder="Teléfono"
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
          name="Municipio"
          holder="Municipio"
          value=""
          required={false}
        />
        <FormInput
          name="Departamento"
          holder="Departamento"
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
      <FormButtons link={'/proveedores'} label={'Crear'} />
    </FormContainer>
  );
}

export function ProviderEdit({ provider }) {
  const updateProviderWithId = updateProvider.bind(null, provider.Id);

  return (
    <FormContainer action={updateProviderWithId}>
      <FormId holder="Proveedor" value={provider.Id} />
      <FormInput
        name="Nombre_empresa"
        holder="Nombre empresa"
        value={provider.Nombre_empresa}
      />
      <FormDiv>
        <FormInput
          name="Nombre_contacto"
          holder="Contacto"
          value={provider.Nombre_contacto}
          required={false}
        />
        <FormInput
          name="Telefono"
          holder="Teléfono"
          value={provider.Telefono}
          required={false}
        />
      </FormDiv>
      <FormDiv>
        <FormInput
          name="Pais"
          holder="País"
          value={provider.Pais}
          required={false}
        />
        <FormInput
          name="Departamento"
          holder="Departamento"
          value={provider.Departamento}
          required={false}
        />
        <FormInput
          name="Municipio"
          holder="Municipio"
          value={provider.Municipio}
          required={false}
        />
      </FormDiv>
      <FormInput
        name="Direccion"
        holder="Dirección"
        value={provider.Direccion}
        required={false}
      />
      <FormButtons link={'/proveedores'} label={'Guardar'} />
    </FormContainer>
  );
}
