'use client';

import { useState } from 'react';
import { FormDiv, FormSpan, FormInputState } from './form-inputs';

export function ReceiptPayment({
  saldoInicial,
  abono = '',
  originalPayment,
  setIsAbonoChanged,
  isNew,
}) {
  const [payment, setPayment] = useState(abono);
  const [saldo, setSaldo] = useState(
    Math.round((saldoInicial - Number(payment)) * 100) / 100
  );

  function handleAbono(value) {
    setPayment(value);
    setSaldo(Math.round((saldoInicial - value) * 100) / 100);

    if (originalPayment !== Number(value)) {
      setIsAbonoChanged(true);
    } else {
      setIsAbonoChanged(false);
    }
  }

  return (
    <>
      <FormDiv flexCol={false}>
        <FormSpan
          name="SaldoInicial"
          holder="Saldo inicial"
          value={saldoInicial}
          color="none"
        />
        <FormInputState
          name="Abono"
          holder="Abono"
          value={payment}
          setValue={handleAbono}
          required={true}
          focus={isNew}
        />
        <FormInputState
          name="Saldo"
          holder="Saldo final"
          value={saldo}
          setValue={setSaldo}
          required={true}
          disabled
        />
      </FormDiv>
    </>
  );
}
