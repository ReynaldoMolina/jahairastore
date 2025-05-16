import { FormDiv, FormInput, FormButtons, FormId } from "@/app/ui/forms/formInputs";
import { createProvider, updateProvider } from "@/app/lib/actions";

export function ProviderCreate() {
  return (
    <form
      action={createProvider}
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-130 p-3 w-full">
      <FormDiv>
        <FormInput name="Nombre_empresa" holder="Nombre empresa" value="" />
        <FormInput name="Nombre_contacto" holder="Contacto" value="" required={false} />
      </FormDiv>
      <FormDiv>
        <FormInput name="Telefono" holder="Teléfono" value="+505 " required={false} />
        <FormInput name="Departamento" holder="Departamento" value="" required={false} />
      </FormDiv>
      <FormDiv>
        <FormInput name="Municipio" holder="Municipio" value="" required={false} />
        <FormInput name="Pais" holder="País" value="" required={false} />
      </FormDiv>
      <FormInput name="Direccion" holder="Dirección" value="" required={false} />
      <FormButtons link={'/providers'} label={'Guardar'} />
    </form>
  );
}

export function ProviderEdit({ provider }) {
  const updateProviderWithId = updateProvider.bind(null, provider.Id_proveedor);  

  return (
    <form
      action={updateProviderWithId}
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-130 p-3 w-full">
      <FormDiv>
        <FormInput name="Nombre_empresa" holder="Nombre empresa" value={provider.Nombre_empresa} />
        <FormInput name="Nombre_contacto" holder="Contacto" value={provider.Nombre_contacto} required={false} />
      </FormDiv>
      <FormDiv>
        <FormInput name="Telefono" holder="Teléfono" value={provider.Telefono} required={false} />
        <FormInput name="Departamento" holder="Departamento" value={provider.Departamento} required={false} />
      </FormDiv>
      <FormDiv>
        <FormInput name="Municipio" holder="Municipio" value={provider.Municipio} required={false} />
        <FormInput name="Pais" holder="País" value={provider.Pais} required={false} />
      </FormDiv>
      <FormInput name="Direccion" holder="Dirección" value={provider.Direccion} required={false} />
      <FormButtons link={'/providers'} label={'Guardar'} />
    </form>
  );
}