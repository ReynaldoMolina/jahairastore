import { FormContainer, FormDiv, FormInput, FormButtons, FormDate, FormId, FormSelectClient, ReceiptStateSelect } from "@/app/ui/forms/formInputs";
import { createReceipt, updateReceipt } from "@/app/lib/actions";
import { ReceiptOptions } from "@/app/ui/forms/ReceiptOptions";
import { ReceiptPayment } from "./ReceiptPayment";
import getDate from "@/app/lib/getDate";

export function ReceiptCreate({ searchParams }) {
  const order = searchParams?.order || '';
  const client = searchParams?.client || '';
  const inicialbal = Number(searchParams?.balance) || 0;
  const abono = Number(searchParams?.payment || 0);
  const currentDate = getDate();

  return (
    <FormContainer
      action={createReceipt}>
      <FormDiv>
        <FormInput name="Id_pedido" holder="Pedido" value={order} type="number" />
        <FormDate name="Fecha" />
      </FormDiv>
      <FormSelectClient value={client} />
      <FormDiv>
        <ReceiptPayment inicialbal={inicialbal} abono={abono} />
      </FormDiv>
      <FormInput name="Concepto" holder="Descripción" value="" required={false} />
      <FormButtons link="/receipts" label={'Crear'} />
    </FormContainer>
  );
}

export function ReceiptEdit({ receipt, receiptpdf }) {
  const updateReceiptWithId = updateReceipt.bind(null, receipt.Id_venta);
  const inicialbal = receipt.Abono + receipt.Saldo;
  const currentDate = getDate();
  
  return (
    <FormContainer
      action={updateReceiptWithId}>
      <FormId holder="Recibo" value={receipt.Id_venta} />
      <FormDiv>
        <FormInput name="Id_pedido" holder="Pedido" value={receipt.Id_pedido} type="number" />
        <FormDate name="Fecha" date={receipt.Fecha} />
      </FormDiv>
      <FormSelectClient value={receipt.Id_cliente} />
      <ReceiptPayment inicialbal={inicialbal} abono={receipt.Abono} />
      <FormInput name="Concepto" holder="Descripción" value={receipt.Concepto} required={false} />

      <ReceiptOptions receipt={receiptpdf} />

      <FormButtons link="/receipts" label={'Guardar'} />
    </FormContainer>
  );
}