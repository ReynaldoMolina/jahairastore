'use client';

import { useState } from 'react';
import LoadingIcon from '../../loading/LoadingIcon';
import { useRouter } from 'next/navigation';
import { getCurrentDate } from '@/app/lib/getDate';
import { bgColors } from '@/components/bgcolors';
import { formatNumber } from '@/app/lib/formatNumber';

export function FormContainer({ children, action, wider = false }) {
  const maxWidth = wider ? '' : 'max-w-3xl';
  return (
    <form
      action={action}
      className={`flex flex-col bg-white dark:bg-neutral-900 rounded-xl md:shadow-md gap-5 md:gap-7 mx-auto ${maxWidth} p-2 md:p-7 w-full h-fit shadow`}
    >
      {children}
    </form>
  );
}

export function FormDiv({ children, flexCol = true }) {
  return (
    <div
      className={`flex ${
        flexCol && 'flex-col md:flex-row'
      } w-full items-end gap-3 md:gap-5 justify-center`}
    >
      {children}
    </div>
  );
}

export function FormInput({
  name,
  holder,
  value,
  type = 'text',
  autocomplete = 'off',
  required = true,
  focus = false,
}) {
  const [inputValue, setInputValue] = useState(value);

  return (
    <div className="flex flex-col w-full gap-1">
      <FormLabel name={name}>
        <span>{holder}</span>
        {!required && (
          <span className="font-normal text-xs text-neutral-700 dark:text-neutral-300">
            {' (opcional)'}
          </span>
        )}
      </FormLabel>
      <input
        id={name}
        name={name}
        type={type}
        min={0}
        step="0.01"
        className={`flex ${bgColors.borderColor} items-center rounded-lg text-xs h-9 px-3 w-full`}
        placeholder={holder}
        autoComplete={autocomplete}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        required={required}
        autoFocus={focus}
      ></input>
    </div>
  );
}

export function FormInputState({
  name,
  holder,
  value,
  setValue,
  type = 'text',
  required = false,
  focus = false,
}) {
  return (
    <div
      className={`flex flex-col w-full gap-1 ${type === 'hidden' && 'hidden'}`}
    >
      <FormLabel name={name}>
        <span>{holder}</span>
        {!required && (
          <span className="font-normal text-xs text-neutral-700 dark:text-neutral-300">
            {' (opcional)'}
          </span>
        )}
      </FormLabel>
      <input
        id={name}
        name={name}
        type={type}
        min={0}
        step="0.01"
        className={`flex ${bgColors.borderColor} items-center rounded-lg text-xs h-9 px-3 w-full`}
        placeholder={holder}
        autoComplete="off"
        value={value}
        onChange={(event) => {
          const newValue =
            type === 'number' ? event.target.valueAsNumber : event.target.value;
          setValue(newValue);
        }}
        required={required}
        autoFocus={focus}
      ></input>
    </div>
  );
}

export function FormSpan({
  name,
  holder,
  value,
  number = true,
  color = 'none',
}) {
  const newValue = number ? formatNumber(value) : value;
  const bgColor = bgColors[color];

  return (
    <div className="flex flex-col w-full gap-1">
      <FormLabel name={name}>{holder}</FormLabel>
      <span
        name={name}
        id={name}
        className={`flex ${bgColors.borderColor} ${bgColor} items-center rounded-lg text-xs h-9 px-3 w-full`}
      >
        {newValue}
      </span>
    </div>
  );
}

export function FormDate({ date }) {
  const currentDate = getCurrentDate();

  return (
    <div className="flex flex-col w-full gap-1">
      <FormLabel name="Fecha">Fecha</FormLabel>
      <input
        id="Fecha"
        name="Fecha"
        type="date"
        className={`flex ${bgColors.borderColor} items-center rounded-lg text-xs h-9 px-3 w-full`}
        defaultValue={date ? date : currentDate}
        required
      ></input>
    </div>
  );
}

export function FormCheck({ name, holder, value, setValue }) {
  return (
    <div className="flex flex-col gap-1 justify-center w-full">
      <FormLabel name={name} textCenter={true}>
        {holder}
      </FormLabel>
      <div className="flex justify-center">
        <input
          name={name}
          id={name}
          className="size-9"
          type="checkbox"
          checked={value}
          onChange={() => setValue((state) => !state)}
        ></input>
      </div>
    </div>
  );
}

export function FormButtons({ isNew, isPending }) {
  const router = useRouter();
  const label = isNew ? 'Crear' : 'Guardar';
  return (
    <div className="flex w-full justify-center gap-4">
      <button
        type="button"
        className="flex items-center justify-center rounded-lg font-bold cursor-pointer h-10 w-full sm:w-50 bg-red-500 text-sm text-white hover:bg-red-600"
        onClick={() => router.back()}
      >
        Cancelar
      </button>
      <button
        type="submit"
        value="Save"
        disabled={isPending}
        className={`flex items-center justify-center rounded-lg font-bold ${
          isPending ? 'cursor-not-allowed' : 'cursor-pointer'
        } h-10 w-full sm:w-50 bg-green-600 hover:bg-green-700 text-sm text-white`}
      >
        {isPending ? <LoadingIcon /> : label}
      </button>
    </div>
  );
}

export function FormId({ holder, value = '' }) {
  return (
    <span
      name="id"
      id="id"
      className="flex font-bold text-xl items-center w-full p-2 md:p-0"
    >
      {holder} {value}
    </span>
  );
}

export function FormError({ isPending, state }) {
  return (
    <>
      {!isPending && state.message?.trim() && (
        <p className="text-xs pl-2 text-center italic text-red-400">
          {state.message}
        </p>
      )}
    </>
  );
}

export function FormLabel({ children, name, textCenter = false }) {
  return (
    <label
      htmlFor={name}
      className={`${textCenter && 'text-center'} text-xs px-3 font-bold`}
    >
      {children}
    </label>
  );
}

export function FormSelect({ value, name, data }) {
  const labels = {
    Id_cliente: 'Cliente',
    Id_proveedor: 'Proveedor',
    Id_categoria: 'Categoría',
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <FormLabel name={name}>
        <span className="font-bold">{labels[name]}</span>
      </FormLabel>
      <select
        id={name}
        name={name}
        className={`flex ${bgColors.borderColor} bg-white dark:bg-neutral-900 rounded-lg text-xs h-9 px-3 w-full`}
        defaultValue={value}
        required
      >
        <option value="" className="text-sm">
          Selecciona una opción
        </option>
        {data.map((option) => {
          return (
            <option key={option.Id} value={option.Id} className="text-sm">
              {option.Nombre}
            </option>
          );
        })}
      </select>
    </div>
  );
}
