'use client';

import { useState } from "react";

export function ReceiptPayment({ inicialbal, abono = '' }) {
  const [payment, setPayment] = useState(abono);
  const [balance, setBalance] = useState(Math.round((inicialbal - payment) * 100) / 100);

  function handleAbono(value) {
    setPayment(value);
    setBalance(Math.round((inicialbal - value) * 100) / 100);
  }

  return (
    <>
      {/* <ReceiptDiv>
        <ReceiptRadio id="half" name="paymentopt" label="50%" />
        <ReceiptRadio id="half" name="paymentopt" label="100%" />
      </ReceiptDiv> */}
      <ReceiptDiv>
        <ReceiptSpan name="Saldo inicial" holder="Saldo inicial" value={inicialbal} type="number" color="bg-amber-100 dark:bg-amber-900" />
        <PaymentInput name="Abono" holder="Abono" value={payment} setValue={handleAbono} color="bg-green-100 dark:bg-green-900" />
        <PaymentInput name="Saldo" holder="Saldo final" value={balance} setValue={setBalance} color="bg-red-100 dark:bg-red-900" />
      </ReceiptDiv>
    </>
  );
}

export function ReceiptDiv({ children }) {
  return (
    <div className="flex w-full items-end gap-3 justify-around">
      {children}
    </div>
  );
}

function PaymentInput({ name, holder, value, setValue, color = "bg-gray-100 dark:bg-neutral-700" }) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor={name}
        className="w-full text-xs pl-2 font-semibold"
      >
        {holder}
      </label>
      <input
        id={name}
        name={name}
        type="number"
        min={0}
        step="0.01"
        className={`flex ${color} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
        placeholder={holder}
        autoComplete="off"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        required={true}
      ></input>
    </div>
  )
}

function ReceiptSpan({ name, holder, value, type = 'text', color = "bg-gray-100 dark:bg-neutral-700 " }) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor={name}
        className="w-full text-xs pl-2 font-semibold"
      >
        {holder}
      </label>
      <span
        name={name}
        id={name}
        className={`flex ${color} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
      >
        {type === 'text' ? value : value.toFixed(2)}
      </span>
    </div>
  )
}

function ReceiptRadio({ id, name, label }) {
  return (
    <label
      for={id}
      className="flex flex-col text-xs justify-center gap-1 bg-neutral-700 py-1 px-2 rounded-xl">
      <input
        type="radio"
        name={name}
        id={id}>
      </input>
      {label}
    </label>
  );
}