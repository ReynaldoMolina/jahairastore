'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from '../register';
import { FormCheck, FormDiv, FormInputState } from './form-inputs';

export function SalePayment({ isCredit, setIsCredit }) {
  const { formTotals, formAbono, setFormAbono } = useFormContext();
  const [saldo, setSaldo] = useState(formTotals.totalSell - formAbono);

  useEffect(() => {
    if (!isCredit) {
      setFormAbono(formTotals.totalSell);
    } else {
      setSaldo(formTotals.totalSell - formAbono);
    }
  }, [isCredit, formTotals.totalSell, formAbono, setFormAbono]);

  return (
    <FormDiv>
      <FormCheck
        name="Credito"
        holder="¿Al crédito?"
        description="Marcar venta como crédito."
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
