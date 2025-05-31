import { FormContainer, FormInput, FormButtons, FormId } from "@/app/ui/forms/formInputs";
import { createWebsiteProduct, updateWebsiteProduct } from "@/app/lib/actions";

export function WebsiteProductCreate() {
  return (
    <FormContainer
      action={createWebsiteProduct}>
      <FormInput name="name" holder="Nombre" value="" />
      <FormInput name="price" holder="Precio" value="" type="number" />
      <FormInput name="image" holder="Link de la imagen" value="" />
      <FormButtons link={'/website'} label={'Crear'} />
    </FormContainer>
  );
}

export function WebsiteProductEdit({ product }) {
  const updateWebsiteProductWithId = updateWebsiteProduct.bind(null, product.id)

  return (
    <FormContainer
      action={updateWebsiteProductWithId}>
      <FormId holder="Producto" value={product.id} />
      <FormInput name="name" holder="Nombre" value={product.name} />
      <FormInput name="price" holder="Precio" value={product.price} type="number" />
      <FormInput name="image" holder="Link de la imagen" value={product.image} />
      <FormButtons link={'/website'} label={'Guardar'} />
    </FormContainer>
  );
}