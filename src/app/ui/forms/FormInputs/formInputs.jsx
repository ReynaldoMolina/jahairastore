'use client';

import { useState } from 'react';
import LoadingIcon from '../../loading/LoadingIcon';
import { useRouter } from 'next/navigation';
import getDate from '@/app/lib/getDate';
import { bgColors } from '@/app/ui/bgcolors';
import { formatNumber } from '@/app/lib/formatNumber';

export function FormContainer({ children, action, wider = false }) {
  const maxWidth = wider ? '' : 'max-w-3xl';
  return (
    <section className="flex grow overflow-y-scroll h-0">
      <form
        action={action}
        className={`flex flex-col bg-white dark:bg-neutral-900 rounded-xl md:shadow-md gap-5 md:gap-7 mx-auto ${maxWidth} px-2 py-4 md:p-7 w-full h-fit mb-2 shadow`}
      >
        {children}
      </form>
    </section>
  );
}

export function FormDiv({ children, flexCol = true }) {
  return (
    <div
      className={`flex ${
        flexCol && 'flex-col md:flex-row'
      } w-full items-end gap-3 md:gap-5`}
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
  const currentDate = getDate();

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
    <div className="flex flex-col gap-1 w-full">
      <FormLabel name={name} textCenter={true}>
        {holder}
      </FormLabel>
      <input
        name={name}
        id={name}
        className="h-9"
        type="checkbox"
        checked={value}
        onChange={() => setValue((state) => !state)}
      ></input>
    </div>
  );
}

export function FormButtons({ link, isNew, isPending }) {
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
      className="flex bg-sky-200 dark:bg-sky-900 font-semibold justify-center items-center rounded-lg text-sm h-9 px-3 w-full"
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
      className={`w-full ${textCenter && 'text-center'} text-xs px-3 font-bold`}
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
