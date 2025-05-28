import { FormContainer, FormDiv, FormInput, FormButtons, FormDate, FormId, FormSelectClient, FormSpan } from "@/app/ui/forms/formInputs";
import { createReceipt, updateReceipt } from "@/app/lib/actions";
import { ReceiptOptions } from "@/app/ui/forms/ReceiptOptions";

export function ReceiptCreate({ searchParams }) {
  const order = searchParams?.order || '';
  const client = searchParams?.client || '';
  const inicialbal = Number(searchParams?.balance) || 0;
  const balance = Math.round((inicialbal - 0) * 100) / 100;

  return (
    <FormContainer
      action={createReceipt}>
      <FormDiv>
        <FormInput name="Id_pedido" holder="Pedido" value={order} type="number" />
        <FormDate name="Fecha" />
      </FormDiv>
      <FormSelectClient value={client} />
      <FormDiv>
        <FormSpan name="Saldo inicial" holder="Saldo inicial" value={inicialbal} type="number" color="bg-amber-100 dark:bg-amber-900" />
        <FormInput name="Abono" holder="Abono" value={0} type="number" color="bg-green-100 dark:bg-green-900" />
        <FormInput name="Saldo" holder="Saldo final" value={balance} type="number" color="bg-red-100 dark:bg-red-900" />
      </FormDiv>
      <FormInput name="Concepto" holder="Descripción" value="" required={false} />
      <FormButtons link={'/receipts'} label={'Guardar'} />
    </FormContainer>
  );
}

export function ReceiptEdit({ receipt, receiptpdf }) {
  const updateReceiptWithId = updateReceipt.bind(null, receipt.Id_venta);
  
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

      <ReceiptOptions receipt={receiptpdf} />

      <FormButtons link={'/receipts'} label={'Guardar'} />
    </FormContainer>
  );
}