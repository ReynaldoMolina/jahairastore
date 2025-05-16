import { FormDiv, FormInput, FormButtons, FormDate, FormId, FormSelectProveedor, FormSelectCategoria, FormSpan } from "@/app/ui/forms/formInputs";
import { createProduct, updateProduct } from "@/app/lib/actions";

export async function ProductCreate() {
  return (
    <form
      action={createProduct}
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-130 p-3 w-full">
      <FormInput name="Nombre" holder="Nombre" value="" />
      <FormDiv>
        <FormSelectProveedor value={1} />
        <FormDate name="Fecha_agregado" />
      </FormDiv>
      <FormDiv>
        <FormSelectCategoria value={1} />
        <FormInput name="Id_shein" holder="Id SheIn" value="" required={false} />
      </FormDiv>
      <FormDiv>
        <FormInput name="Precio_compra" holder="Precio compra" value={0} type="number" />
        <FormInput name="Precio_venta" holder="Precio venta" value={0} type="number" />
        <FormSpan name="Profit" holder="Ganancia" value={0} type="number" />
      </FormDiv>
      <FormInput name="Descripcion" holder="Descripción" value="" required={false} />
      <FormButtons link={'/products'} label={'Guardar'} />
    </form>
  );
}

export function ProductEdit({ product }) {
  const updaProducttWithId = updateProduct.bind(null, product.Id_producto)

  return (
    <form
      action={updaProducttWithId}
      className="flex flex-col bg-white dark:bg-neutral-700 rounded-xl shadow-md gap-4 mx-auto max-w-130 p-3 w-full">
      <FormId holder="Recibo" value={receipt.Id_venta} />
      <FormDiv>
        <FormInput name="Id_pedido" holder="Pedido" value={receipt.Id_pedido} type="number" />
        <FormDate name="Fecha" date={receipt.Fecha} />
      </FormDiv>
      <FormInput name="Id_cliente" holder="Cliente" value={receipt.Id_cliente} />
      <FormDiv>
        <FormInput name="Abono" holder="Abono" value={receipt.Abono} type="number" />
        <FormInput name="Saldo" holder="Saldo" value={receipt.Saldo} type="number" />
      </FormDiv>
      <FormInput name="Concepto" holder="Descripción" value={receipt.Concepto} required={false} />
      <FormButtons link={'/receipts'} label={'Guardar'} />
    </form>
  );
}