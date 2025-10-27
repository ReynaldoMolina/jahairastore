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
  FormIdNew,
  FormContainerNew,
} from './form-inputs/form-inputs';
import { ReceiptPayment } from './form-inputs/receipt-payment';
import { ReceiptOptions } from './options/receipt';
import { CardContent } from '../ui/card';
import { FieldGroup, FieldSeparator, FieldSet } from '../ui/field';

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
    <FormContainerNew action={formAction}>
      <CardContent>
        <FieldGroup>
          <FieldSet>
            <FormDiv flexCol={false}>
              <FormInput
                name="Id_pedido"
                holder="Pedido"
                value={isNew ? pedido : receipt.Id_pedido}
                type="number"
              />
              <FormDate date={isNew ? '' : receipt.Fecha} />
            </FormDiv>
          </FieldSet>
          <FieldSet>
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
          </FieldSet>
          <FieldSeparator />
          {!isNew && !isAbonoChanged && (
            <ReceiptOptions register={receiptpdf} formName="pedidos" />
          )}
        </FieldGroup>

        <FormError isPending={isPending} state={state} />
      </CardContent>
      <FormButtons isNew={isNew} isPending={isPending} />
    </FormContainerNew>
  );
}
