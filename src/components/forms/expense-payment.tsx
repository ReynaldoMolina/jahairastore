'use client';

import { useState } from 'react';
import { FormInputState } from './form-inputs/form-inputs';
import { bgColors } from '../bgcolors';
import { ActionType, ExpenseFormType } from '@/types/types';
import FormInputGroup from './form-inputs/form-input-group';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface ExpensePaymentProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  expense?: ExpenseFormType;
  action: ActionType;
}

export function ExpensePayment<T extends FieldValues>({
  form,
  expense,
  action,
}: ExpensePaymentProps<T>) {
  const [cambioDolar, setCambioDolar] = useState(expense?.cambio_dolar ?? 37);

  const [gasto, setGasto] = useState({
    gastoInNio: (expense?.gasto ?? 0) * (expense?.cambio_dolar ?? 37),
    gastoInUsd: action === 'create' ? 0 : expense?.gasto,
  });

  function handleNio(gastoInNio: number) {
    setGasto({
      gastoInNio,
      gastoInUsd: gastoInNio / cambioDolar,
    });
  }

  function handleDolar(gastoInUsd: number) {
    setGasto({
      gastoInNio: gastoInUsd * cambioDolar,
      gastoInUsd,
    });
  }

  function handleCambioDolar(cambioDolar: number) {
    setCambioDolar(cambioDolar);
    setGasto({
      gastoInNio: gasto.gastoInNio,
      gastoInUsd: gasto.gastoInNio / cambioDolar,
    });
  }

  return (
    <FormInputGroup>
      <PaymentInput form={form} name="cambio_dolar" />
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
    </FormInputGroup>
  );
}

type PaymentInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
};

function PaymentInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
}: PaymentInputProps<T>) {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder={placeholder ?? label}
                {...field}
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                autoComplete="off"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
          className={`flex ${bgColors.borderColor} items-center rounded-lg text-xs h-9 px-3 w-full`}
          placeholder={holder}
          autoComplete="off"
          value={value[name]}
          onChange={(event) => setValue(event.target.value)}
          required={true}
          autoFocus={focus}
        ></input>
      </div>
    </>
  );
}

// export function ExpensePayment({ gasto = '', cambioDolar, isNew }) {
//   const [cambioDol, setCambioDol] = useState(cambioDolar);
//   const [payment, setPayment] = useState({
//     GastoCor: gasto,
//     Gasto: isNew ? '' : gasto / cambioDol,
//   });

//   function handleNio(value) {
//     setPayment({
//       GastoCor: value,
//       Gasto: value / cambioDol,
//     });
//   }

//   function handleDol(value) {
//     setPayment({
//       GastoCor: (value * cambioDol).toFixed(2),
//       Gasto: value,
//     });
//   }

//   function handleCambioDol(value) {
//     setCambioDol(value);
//     setPayment({
//       GastoCor: payment.GastoCor,
//       Gasto: payment.GastoCor / value,
//     });
//   }

//   return (
//     <>
//       <FormDiv flexCol={false}>
//         <FormInputState
//           name="Cambio_dolar"
//           holder="Cambio USD"
//           value={cambioDol}
//           setValue={handleCambioDol}
//           required={true}
//         />
//         <PaymentInput
//           name="GastoCor"
//           holder="Gasto CS"
//           value={payment}
//           setValue={handleNio}
//           focus={isNew}
//         />
//         <PaymentInput
//           name="Gasto"
//           holder="Gasto $"
//           value={payment}
//           setValue={handleDol}
//         />
//       </FormDiv>
//     </>
//   );
// }

// function PaymentInput({ name, holder, value, setValue, focus = false }) {
//   return (
//     <div className="flex flex-col w-full gap-1">
//       <label htmlFor={name} className="w-full text-xs pl-2 font-semibold">
//         {holder}
//       </label>
//       <input
//         id={name}
//         name={name}
//         type="number"
//         min={0}
//         step="any"
//         className={`flex ${bgColors.borderColor} items-center rounded-lg text-xs h-9 px-3 w-full`}
//         placeholder={holder}
//         autoComplete="off"
//         value={value[name]}
//         onChange={(event) => setValue(event.target.value)}
//         required={true}
//         autoFocus={focus}
//       ></input>
//     </div>
//   );
// }
