import { FormContainer, FormDiv, FormInput, FormButtons, FormDate, FormId, FormSelectProveedor, FormSelectCategoria } from "@/app/ui/forms/formInputs";
import { createProduct, updateProduct } from "@/app/lib/actions";
import getDate from "@/app/lib/getDate";
import { ProductPrices } from "../productForm/ProductFormInputs";

export function ProductCreate() {
  const currentDate = getDate();
  const product = {
    Precio_venta: 0,
    Precio_compra: 0,
    Inventario: false,
    Cambio_dolar: null,
  }
  return (
    <FormContainer
      action={createProduct}>
      <FormInput name="Nombre" holder="Nombre" value="" />
      <FormDiv>
        <FormInput name="Id_shein" holder="Id SheIn" value="" required={false} />
        <FormDate name="Fecha_agregado" />
      </FormDiv>
      <FormDiv>
        <FormSelectProveedor value={1} />
        <FormSelectCategoria value={1} />
      </FormDiv>
      <FormInput name="Descripcion" holder="Descripción" value="" required={false} />
      <ProductPrices product={product} />
      <FormButtons link="/products" label={'Crear'} />
    </FormContainer>
  );
}

export function ProductEdit({ product }) {
 const updateProductWithId = updateProduct.bind(null, product.Id_producto);
 const currentDate = getDate();

  return (
    <FormContainer
      action={updateProductWithId}>
      <FormId holder="Producto" value={product.Id_producto} />
      <FormInput name="Nombre" holder="Nombre" value={product.Nombre} />
      <FormDiv>
        <FormInput name="Id_shein" holder="Id SheIn" value={product.Id_shein} required={false} />
        <FormDate name="Fecha_agregado" date={product.Fecha} />
      </FormDiv>
      <FormDiv>
        <FormSelectProveedor value={product.Id_proveedor} />
        <FormSelectCategoria value={product.Id_categoria} />
      </FormDiv>
      <FormInput name="Descripcion" holder="Descripción" value={product.Descripcion} required={false} />
      <ProductPrices product={product} />
      <FormButtons link="/products" label={'Guardar'} />
    </FormContainer>
  );
}