import Image from "next/image";
import { FormInput, FormButtons, FormId } from "@/app/ui/forms/formInputs";
import { createWebsiteProduct, updateWebsiteProduct } from "@/app/lib/actions";

export function WebsiteProductCreate() {
  return (
    <form
      action={createWebsiteProduct}
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-130 p-3 w-full">
      <FormInput name="name" holder="Nombre" value="" />
      <FormInput name="price" holder="Precio" value="" type="number" />
      <FormInput name="image" holder="Link de la imagen" value="" />
      <FormButtons link={'/website'} label={'Guardar'} />
    </form>
  );
}

export function WebsiteProductEdit({ product }) {
  const updateWebsiteProductWithId = updateWebsiteProduct.bind(null, product.id)

  return (
    <form
      action={updateWebsiteProductWithId}
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-130 p-3 w-full">
      <FormId holder="Producto" value={product.id} />
      <FormInput name="name" holder="Nombre" value={product.name} />
      <FormInput name="price" holder="Precio" value={product.price} type="number" />
      <FormInput name="image" holder="Link de la imagen" value={product.image} />
      <FormButtons link={'/website'} label={'Guardar'} />
    </form>
  );
}