import { FormContainer, FormInput, FormButtons, FormId } from "@/app/ui/forms/formInputs";
import { createWebsiteProduct, updateWebsiteProduct } from "@/app/lib/actions";

export function WebsiteProductCreate() {
  return (
    <FormContainer
      action={createWebsiteProduct}>
      <FormId holder="Crear producto website" />
      <FormInput name="Nombre" holder="Nombre" value="" />
      <FormInput name="Precio" holder="Precio" value="" type="number" />
      <FormInput name="Imagen" holder="Link de la imagen" value="" />
      <FormButtons link={'/website'} label={'Crear'} />
    </FormContainer>
  );
}

export function WebsiteProductEdit({ product }) {
  const updateWebsiteProductWithId = updateWebsiteProduct.bind(null, product.Id)

  return (
    <FormContainer
      action={updateWebsiteProductWithId}>
      <FormId holder="Producto website" value={product.Id} />
      <FormInput name="Nombre" holder="Nombre" value={product.Nombre} />
      <FormInput name="Precio" holder="Precio" value={product.Precio} type="number" />
      <FormInput name="Imagen" holder="Link de la imagen" value={product.Imagen} />
      <FormButtons link={'/website'} label={'Guardar'} />
    </FormContainer>
  );
}