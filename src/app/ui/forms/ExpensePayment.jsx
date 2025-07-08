'use client';

import { useState } from 'react';
import { FormDiv, FormInputState } from './FormInputs/formInputs';
import { bgColors } from '../bgcolors';

export function ExpensePayment({ gasto = '', cambioDolar, isNew }) {
  const [cambioDol, setCambioDol] = useState(cambioDolar);
  const [payment, setPayment] = useState({
    GastoCor: gasto,
    Gasto: isNew ? '' : gasto / cambioDol,
  });

  function handleNio(value) {
    setPayment({
      GastoCor: value,
      Gasto: value / cambioDol,
    });
  }

  function handleDol(value) {
    setPayment({
      GastoCor: (value * cambioDol).toFixed(2),
      Gasto: value,
    });
  }

  function handleCambioDol(value) {
    setCambioDol(value);
    setPayment({
      GastoCor: payment.GastoCor,
      Gasto: payment.GastoCor / value,
    });
  }

  return (
    <>
      <FormDiv flexCol={false}>
        <FormInputState
          name="Cambio_dolar"
          holder="Cambio USD"
          value={cambioDol}
          setValue={handleCambioDol}
          required={true}
        />
        <PaymentInput
          name="GastoCor"
          holder="Gasto CS"
          value={payment}
          setValue={handleNio}
          focus={isNew}
        />
        <PaymentInput
          name="Gasto"
          holder="Gasto $"
          value={payment}
          setValue={handleDol}
        />
      </FormDiv>
    </>
  );
}

function PaymentInput({ name, holder, value, setValue, focus = false }) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor={name} className="w-full text-xs pl-2 font-semibold">
        {holder}
      </label>
      <input
        id={name}
        name={name}
        type="number"
        min={0}
        step="any"
        className={`flex ${bgColors.borderColor} items-center rounded-lg shadow-sm text-xs h-9 px-3 w-full`}
        placeholder={holder}
        autoComplete="off"
        value={value[name]}
        onChange={(event) => setValue(event.target.value)}
        required={true}
        autoFocus={focus}
      ></input>
    </div>
  );
}
