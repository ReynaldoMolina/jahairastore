'use client';

import { useState } from 'react';
import {
  FormDiv,
  FormSpan,
  FormInputState,
} from '@/app/ui/forms/FormInputs/formInputs';

export function ReceiptPayment({ saldoInicial, abono = '' }) {
  const [payment, setPayment] = useState(abono);
  const [saldo, setSaldo] = useState(
    Math.round((saldoInicial - payment) * 100) / 100
  );

  function handleAbono(value) {
    setPayment(value);
    setSaldo(Math.round((saldoInicial - value) * 100) / 100);
  }

  return (
    <>
      <FormDiv flexCol={false}>
        <FormSpan
          name="SaldoInicial"
          holder="Saldo inicial"
          value={saldoInicial}
          type="number"
          color="none"
        />
        <FormInputState
          name="Abono"
          holder="Abono"
          value={payment}
          setValue={handleAbono}
          required={true}
        />
        <FormInputState
          name="Saldo"
          holder="Saldo final"
          value={saldo}
          setValue={setSaldo}
          required={true}
        />
      </FormDiv>
    </>
  );
}
