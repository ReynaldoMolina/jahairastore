import { FormContainer, FormDiv, FormInput, FormButtons, FormDate, FormId, FormSelectProveedor, FormSelectCategoria, FormSpan } from "@/app/ui/forms/formInputs";
import { createProduct, updateProduct } from "@/app/lib/actions";

export function ProductCreate() {
  return (
    <FormContainer
      action={createProduct}>
      <FormInput name="Nombre" holder="Nombre" value="" />
      <FormDiv>
        <FormInput name="Id_shein" holder="Id SheIn" value="" required={false} />
        <FormDate name="Fecha_agregado" />
      </FormDiv>
      <FormDiv>
        <FormInput name="Precio_venta" holder="Precio venta" value={0} type="number" color="bg-green-100 dark:bg-green-900" />
        <FormInput name="Precio_compra" holder="Precio compra" value={0} type="number" color="bg-red-100 dark:bg-red-900" />
        <FormSpan name="Profit" holder="Ganancia" value={0} type="number" color="bg-blue-100 dark:bg-blue-900" />
      </FormDiv>
      <FormDiv>
        <FormSelectProveedor value={1} />
        <FormSelectCategoria value={1} />
      </FormDiv>
      <FormInput name="Descripcion" holder="Descripción" value="" required={false} />
      <FormButtons link={'/products'} label={'Guardar'} />
    </FormContainer>
  );
}

export function ProductEdit({ product }) {
 const updateProductWithId = updateProduct.bind(null, product.Id_producto)

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
        <FormInput name="Precio_venta" holder="Precio venta" value={product.Precio_venta} type="number" color="bg-green-100 dark:bg-green-900" />
        <FormInput name="Precio_compra" holder="Precio compra" value={product.Precio_compra} type="number" color="bg-red-100 dark:bg-red-900" />
        <FormSpan name="Ganancia" holder="Ganancia" value={product.Ganancia} type="number" color="bg-blue-100 dark:bg-blue-900" />
      </FormDiv>
      <FormDiv>
        <FormSelectProveedor value={product.Id_proveedor} />
        <FormSelectCategoria value={product.Id_categoria} />
      </FormDiv>
      <FormInput name="Descripcion" holder="Descripción" value={product.Descripcion} required={false} />
      <FormButtons link={'/products'} label={'Guardar'} />
    </FormContainer>
  );
}