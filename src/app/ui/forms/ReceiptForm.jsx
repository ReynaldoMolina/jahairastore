import { FormContainer, FormDiv, FormInput, FormButtons, FormDate, FormId, FormSelectClient } from "@/app/ui/forms/formInputs";
import { createReceipt, updateReceipt } from "@/app/lib/actions";

export function ReceiptCreate(props) {
  return (
    <FormContainer
      action={createReceipt}>
      <FormDiv>
        <FormInput name="Id_pedido" holder="Pedido" value="" type="number" />
        <FormDate name="Fecha" />
      </FormDiv>
      <FormSelectClient value="" />
      <FormInput name="Id_cliente" holder="Cliente" value="" />
      <FormDiv>
        <FormInput name="Abono" holder="Abono" value={0} type="number" />
        <FormInput name="Saldo" holder="Saldo" value={0} type="number" />
      </FormDiv>
      <FormInput name="Concepto" holder="Descripción" value="" required={false} />
      <FormButtons link={'/receipts'} label={'Guardar'} />
    </FormContainer>
  );
}

export function ReceiptEdit({ receipt }) {
  const updateReceiptWithId = updateReceipt.bind(null, receipt.Id_venta)

  return (
    <FormContainer
      action={updateReceiptWithId}>
      <FormId holder="Recibo" value={receipt.Id_venta} />
      <FormDiv>
        <FormInput name="Id_pedido" holder="Pedido" value={receipt.Id_pedido} type="number" />
        <FormDate name="Fecha" date={receipt.Fecha} />
      </FormDiv>
      <FormSelectClient value={receipt.Id_cliente} />
      <FormDiv>
        <FormInput name="Abono" holder="Abono" value={receipt.Abono} type="number" />
        <FormInput name="Saldo" holder="Saldo" value={receipt.Saldo} type="number" />
      </FormDiv>
      <FormInput name="Concepto" holder="Descripción" value={receipt.Concepto} required={false} />
      <FormButtons link={'/receipts'} label={'Guardar'} />
    </FormContainer>
  );
}