'use client';

import {
  FormButtons,
  FormContainer,
  FormDate,
  FormDiv,
  FormError,
  FormId,
  FormInput,
  FormSelect,
} from '@/app/ui/forms/FormInputs/formInputs';
import { useActionState, useState } from 'react';
import { ReceiptPayment } from './Receipts/ReceiptPayment';
import { ReceiptOptions } from '@/app/ui/forms/Receipts/ReceiptOptions';
import { createReceipt, updateReceipt } from '@/app/lib/actions';

export function ReceiptForm({
  isNew,
  receipt,
  receiptpdf,
  searchParams,
  selectData,
}) {
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
        <FormDate name="Fecha" date={isNew ? '' : receipt.Fecha} />
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

      {!isNew && !isAbonoChanged && <ReceiptOptions receipt={receiptpdf} />}

      <FormError isPending={isPending} state={state} />
      <FormButtons link="/recibos" isNew={isNew} isPending={isPending} />
    </FormContainer>
  );
}
