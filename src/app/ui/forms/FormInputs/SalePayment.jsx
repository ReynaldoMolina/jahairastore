'use client';

import { useEffect } from 'react';
import { FormDiv, FormCheck, FormInputState } from '../FormInputs/formInputs';
import { useFormContext } from '../RegisterForm';

export function SalePayment({ isCredit, setIsCredit }) {
  const { formTotals, formAbono, setFormAbono } = useFormContext();

  useEffect(() => {
    if (!isCredit) {
      setFormAbono(formTotals.totalSell);
    }
  }, [isCredit, formTotals.totalSell, setFormAbono]);

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
    </FormDiv>
  );
}
