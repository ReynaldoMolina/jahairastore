'use client';

import { useEffect, useState } from 'react';
import { FormDiv, FormCheck, FormInputState } from './formInputs';
import { useFormContext } from '../RegisterForm';

export function SalePayment({ isCredit, setIsCredit }) {
  const { formTotals, formAbono, setFormAbono } = useFormContext();
  const [saldo, setSaldo] = useState(formTotals.totalSell - formAbono);

  useEffect(() => {
    if (!isCredit) {
      setFormAbono(formTotals.totalSell);
    } else {
      setSaldo(formTotals.totalSell - formAbono);
    }
  }, [isCredit, formTotals.totalSell, formAbono]);

  return (
    <FormDiv flexCol={false}>
      <FormCheck
        name="Credito"
        holder="¿Al crédito?"
        value={isCredit}
        setValue={setIsCredit}
      />
      <FormInputState
        name="Abono"
        holder="Abono"
        value={formAbono}
        setValue={setFormAbono}
        type={isCredit ? 'number' : 'hidden'}
        required={true}
      />
      <FormInputState
        name="Saldo"
        holder="Saldo"
        value={saldo}
        setValue={setSaldo}
        type="hidden"
        required={true}
      />
    </FormDiv>
  );
}
