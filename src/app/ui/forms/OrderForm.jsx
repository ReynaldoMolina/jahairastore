import { FormDiv, FormInput, FormButtons, FormDate, FormId, FormSelectProveedor, FormSelectCategoria, FormSpan, FormSelectClient } from "@/app/ui/forms/formInputs";
import ProductSearch from "@/app/ui/orderForm/ProductSearch";
// import { createProduct, updateProduct } from "@/app/lib/actions";

export function OrderCreate({ searchParams }) {  
  return (
    <form
      // action={createProduct}
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-150 p-3 w-full h-0 grow overflow-y-scroll">
      <FormDate name="Fecha_agregado" />
      <FormSelectClient value="" />
      <FormDiv>
        <FormSpan name="OrderTotal" holder="Total" value={0} type="number" />
        <FormSpan name="OrderAbono" holder="Abono" value={0} type="number" />
        <FormSpan name="Saldo" holder="Saldo" value={0} type="number" />
        <FormSpan name="Profit" holder="Ganancia" value={0} type="number" />
      </FormDiv>

      <ProductSearch searchParams={searchParams} />

      <FormButtons link={'/orders'} label={'Guardar'} />
    </form>
  );
}

export function OrderEdit({ product }) {
//  const updateProductWithId = updateProduct.bind(null, product.Id_producto)
 const profit = product.Precio_venta - product.Precio_compra;

  return (
    <form
      // action={updateProductWithId}
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-130 p-3 w-full">
      <FormId holder="Producto" value={product.Id_producto} />
      <FormInput name="Nombre" holder="Nombre" value={product.Nombre} />
      <FormDiv>
        <FormInput name="Id_shein" holder="Id SheIn" value={product.Id_shein} required={false} />
        <FormDate name="Fecha_agregado" date={product.Fecha_agregado} />
      </FormDiv>
      <FormDiv>
        <FormInput name="Precio_compra" holder="Precio compra" value={product.Precio_compra} type="number" />
        <FormInput name="Precio_venta" holder="Precio venta" value={product.Precio_venta} type="number" />
        <FormSpan name="Profit" holder="Ganancia" value={profit} type="number" />
      </FormDiv>
      <FormDiv>
        <FormSelectProveedor value={product.Id_proveedor} />
        <FormSelectCategoria value={product.Id_categoria} />
      </FormDiv>
      <FormInput name="Descripcion" holder="Descripción" value={product.Descripcion} required={false} />
      <FormButtons link={'/products'} label={'Guardar'} />
    </form>
  );
}