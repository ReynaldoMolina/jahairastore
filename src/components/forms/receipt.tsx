'use client';

import { createReceipt, updateReceipt } from '@/server-actions/actions';
import { useActionState, useState } from 'react';
import {
  FormContainer,
  FormId,
  FormDiv,
  FormDate,
  FormSelect,
  FormError,
  FormButtons,
  FormInput,
} from './form-inputs/form-inputs';
import { ReceiptPayment } from './form-inputs/receipt-payment';
import { ReceiptOptions } from './options/receipt';

interface ReceiptForm {
  isNew: boolean;
  receipt?: any;
  receiptpdf?: any;
  searchParams?: any;
  selectData: any;
}

export function ReceiptForm({
  isNew,
  receipt,
  receiptpdf,
  searchParams,
  selectData,
}: ReceiptForm) {
  const action = isNew ? createReceipt : updateReceipt.bind(null, receipt.Id);
  const [state, formAction, isPending] = useActionState(action, {
    message: '',
  });
  const [isAbonoChanged, setIsAbonoChanged] = useState(false);

  let pedido, cliente, saldoInicial, abono, originalAbono;

  if (isNew) {
    pedido = Number(searchParams?.pedido) || '';
    cliente = Number(searchParams?.cliente) || 0;
    saldoInicial = Number(searchParams?.saldo) || 0;
    abono = Number(searchParams?.abono || 0);
  } else {
    saldoInicial = receipt.Abono + receipt.Saldo;
    abono = receipt.Abono;
    originalAbono = receipt.Abono;
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
        <FormDate date={isNew ? '' : receipt.Fecha} />
      </FormDiv>
      <FormSelect
        value={isNew ? cliente : receipt.Id_cliente}
        name="Id_cliente"
        data={selectData}
      />
      <ReceiptPayment
        saldoInicial={saldoInicial}
        abono={abono}
        originalPayment={originalAbono}
        setIsAbonoChanged={setIsAbonoChanged}
        isNew={isNew}
      />
      <FormInput
        name="Concepto"
        holder="Concepto"
        value={isNew ? '' : receipt.Concepto}
        required={false}
      />

      {!isNew && !isAbonoChanged && (
        <ReceiptOptions register={receiptpdf} formName="pedidos" />
      )}

      <FormError isPending={isPending} state={state} />
      <FormButtons isNew={isNew} isPending={isPending} />
    </FormContainer>
  );
}
