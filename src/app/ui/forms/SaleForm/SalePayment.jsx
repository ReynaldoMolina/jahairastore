'use client';

import { useState, useEffect } from 'react';
import {
  FormDiv,
  FormCheck,
  FormInputState,
} from '../FormInputs/formInputsClient';
import { useFormContext } from '../RegisterForm';

export function SalePayment({ credito = false }) {
  const [isCredit, setIsCredit] = useState(credito);
  const { formTotals, formAbono, setFormAbono } = useFormContext();

  useEffect(() => {
    if (!isCredit) {
      setFormAbono(formTotals.totalSell);
    }
  }, [isCredit, formTotals.totalSell, setFormAbono]);

  return (
    <FormDiv>
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
      />
    </FormDiv>
  );
}
