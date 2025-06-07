import { FormContainer, FormDiv, FormInput, FormButtons, FormDate, FormId, FormSelect } from "@/app/ui/forms/formInputs";
import { createReceipt, updateReceipt } from "@/app/lib/actions";
import { ReceiptOptions } from "@/app/ui/forms/ReceiptOptions";
import { ReceiptPayment } from "./ReceiptPayment";

export function ReceiptCreate({ searchParams }) {
  const pedido = searchParams?.pedido || '';
  const cliente = searchParams?.cliente || '';
  const saldoInicial = Number(searchParams?.saldo) || 0;
  const abono = Number(searchParams?.abono || 0);

  return (
    <FormContainer
      action={createReceipt}>
      <FormId holder="Crear recibo" />
      <FormDiv>
        <FormInput name="Id_pedido" holder="Pedido" value={pedido} type="number" />
        <FormDate name="Fecha" />
      </FormDiv>
      <FormSelect value={cliente} name="Id_cliente" label="Cliente" />
      <FormDiv>
        <ReceiptPayment saldoInicial={saldoInicial} abono={abono} />
      </FormDiv>
      <FormInput name="Concepto" holder="Descripción" value="" required={false} />
      <FormButtons link="/recibos" label={'Crear'} />
    </FormContainer>
  );
}

export function ReceiptEdit({ receipt, receiptpdf }) {
  const updateReceiptWithId = updateReceipt.bind(null, receipt.Id);
  const saldoInicial = receipt.Abono + receipt.Saldo;
  
  return (
    <FormContainer
      action={updateReceiptWithId}>
      <FormId holder="Recibo" value={receipt.Id} />
      <FormDiv>
        <FormInput name="Id_pedido" holder="Pedido" value={receipt.Id_pedido} type="number" />
        <FormDate name="Fecha" date={receipt.Fecha} />
      </FormDiv>
      <FormSelect value={receipt.Id_cliente} name="Id_cliente" label="Cliente" />
      <ReceiptPayment saldoInicial={saldoInicial} abono={receipt.Abono} />
      <FormInput name="Concepto" holder="Descripción" value={receipt.Concepto} required={false} />

      <ReceiptOptions receipt={receiptpdf} />

      <FormButtons link="/recibos" label={'Guardar'} />
    </FormContainer>
  );
}