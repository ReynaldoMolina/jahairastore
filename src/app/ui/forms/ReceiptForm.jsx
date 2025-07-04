'use client';

import {
  FormContainer,
  FormDiv,
  FormInput,
  FormButtons,
  FormDate,
  FormId,
  FormError,
} from '@/app/ui/forms/FormInputs/formInputs';
import { useActionState } from 'react';
import { ReceiptPayment } from './Receipts/ReceiptPayment';
import { ReceiptOptions } from '@/app/ui/forms/Receipts/ReceiptOptions';
import { createReceipt, updateReceipt } from '@/app/lib/actions';

export function ReceiptForm({
  children,
  isNew,
  receipt,
  receiptpdf,
  searchParams,
}) {
  const action = isNew ? createReceipt : updateReceipt.bind(null, receipt.Id);
  const [state, formAction, isPending] = useActionState(action, {
    message: '',
  });

  let pedido, saldoInicial, abono;

  if (isNew) {
    pedido = searchParams?.pedido || '';
    saldoInicial = Number(searchParams?.saldo) || 0;
    abono = Number(searchParams?.abono || 0);
  } else {
    saldoInicial = receipt.Abono + receipt.Saldo;
    abono = receipt.Abono;
  }

  return (
    <FormContainer action={formAction}>
      <FormId
        holder={isNew ? 'Crear recibo' : 'Recibo'}
        value={isNew ? '' : receipt.Id}
      />
      <FormDiv>
        <FormInput
          name="Id_pedido"
          holder="Pedido"
          value={isNew ? pedido : receipt.Id_pedido}
          type="number"
        />
        <FormDate name="Fecha" date={isNew ? '' : receipt.Fecha} />
      </FormDiv>
      {children}
      <ReceiptPayment saldoInicial={saldoInicial} abono={abono} />
      <FormInput
        name="Concepto"
        holder="Descripción"
        value={isNew ? '' : receipt.Concepto}
        required={false}
      />

      {!isNew && <ReceiptOptions receipt={receiptpdf} />}

      <FormError isPending={isPending} state={state} />
      <FormButtons link="/recibos" isNew={isNew} isPending={isPending} />
    </FormContainer>
  );
}
