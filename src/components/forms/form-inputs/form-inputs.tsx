'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { bgColors } from '@/lib/bg-colors';
import { formatNumber } from '@/lib/formatters';
import { getCurrentDate } from '@/lib/get-date';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export function FormContainer({ children, action, wider = false }) {
  const maxWidth = wider ? '' : 'max-w-3xl';
  return (
    <form
      action={action}
      className={`flex flex-col bg-white dark:bg-neutral-900 rounded-xl md:shadow-md gap-3 md:gap-7 mx-auto ${maxWidth} p-5 w-full h-fit shadow`}
    >
      {children}
    </form>
  );
}

export function FormContainerNew({ children, action, wider = false }) {
  const maxWidth = wider ? '' : 'max-w-3xl';

  return (
    <form action={action} className={cn(maxWidth, 'mx-auto w-full')}>
      <Card>{children}</Card>
    </form>
  );
}

export function FormDiv({ children, flexCol = true }) {
  return (
    <div
      className={`flex ${
        flexCol && 'flex-col md:flex-row'
      } w-full items-end gap-5 justify-center`}
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
    <div className="grid w-full items-center gap-3">
      <Label htmlFor={name}>
        <span>{holder}</span>
        {!required && (
          <span className="font-normal text-xs text-neutral-700 dark:text-neutral-300">
            {' (opcional)'}
          </span>
        )}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        min={0}
        step="0.01"
        placeholder={holder}
        autoComplete={autocomplete}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        required={required}
        autoFocus={focus}
      ></Input>
    </div>
  );
}

interface FormTextArea {
  name: string;
  value: any;
  label: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function FormTextArea({
  name,
  value,
  label,
  placeholder,
  required,
  className,
  ...props
}: FormTextArea) {
  const [inputValue, setInputValue] = useState(value);

  return (
    <div className="grid w-full gap-3">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder ? placeholder : label}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        required={required}
        {...props}
        className={className}
      />
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
  disabled = false,
}) {
  return (
    <div
      className={`flex flex-col w-full gap-3 ${type === 'hidden' && 'hidden'}`}
    >
      <FormLabel name={name}>
        <span>{holder}</span>
        {!required && (
          <span className="font-normal text-xs text-neutral-700 dark:text-neutral-300">
            {' (opcional)'}
          </span>
        )}
      </FormLabel>
      <Input
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
        disabled={disabled}
      ></Input>
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
    <div className="flex flex-col w-full gap-3">
      <FormLabel name={name}>{holder}</FormLabel>
      <span
        id={name}
        className={`flex ${bgColors.borderColor} ${bgColor} items-center rounded-lg text-xs h-9 px-3 w-full`}
      >
        {newValue}
      </span>
    </div>
  );
}

export function FormSpanNew({
  name,
  holder,
  value,
  number = true,
  color = 'none',
}) {
  const newValue = number ? formatNumber(value) : value;
  const bgColor = bgColors[color];

  return (
    <div className="flex flex-col w-full gap-3">
      <Label id={name}>{holder}</Label>
      <Input id={name} className={bgColor} value={newValue} disabled />
    </div>
  );
}

interface FormDate {
  date: string;
  hidden?: boolean;
}

export function FormDate({ date, hidden }: FormDate) {
  const currentDate = getCurrentDate();

  return (
    <div className={`${hidden ? 'hidden' : ''} flex flex-col w-full gap-3`}>
      <FormLabel name="Fecha">Fecha</FormLabel>
      <input
        id="Fecha"
        name="Fecha"
        type="date"
        className={`flex border items-center rounded-lg text-xs h-9 px-3 w-full`}
        defaultValue={date ? date : currentDate}
        required
      ></input>
    </div>
  );
}

export function FormCheck({ name, holder, description, value, setValue }) {
  return (
    <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950 w-full">
      <Checkbox
        name={name}
        checked={value}
        onCheckedChange={() => setValue((state) => !state)}
        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-xs leading-none font-medium">{holder}</p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </Label>
  );
  return (
    <div className="flex flex-col gap-3 justify-center w-full">
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
    <CardFooter className="gap-3 justify-end border-t">
      <Button type="button" variant="secondary" onClick={() => router.back()}>
        Cancelar
      </Button>
      <Button disabled={isPending} className="w-22">
        {label}
        {isPending && <Spinner />}
      </Button>
    </CardFooter>
  );
}

export function FormId({ holder, value = '' }) {
  return (
    <span id="id" className="flex font-bold text-md items-center w-full mb-2">
      {holder} {value}
    </span>
  );
}

interface FormIdNew {
  holder: string;
  value?: string;
  description?: string;
}

export function FormIdNew({ holder, value, description }: FormIdNew) {
  const router = useRouter();

  return (
    <CardHeader className="border-b inline-flex gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => router.back()}
      >
        <ArrowLeft />
      </Button>
      <div className="flex flex-col gap-2">
        <CardTitle>
          {holder} {value ? value : null}
        </CardTitle>
        <CardDescription>{description ? description : null}</CardDescription>
      </div>
    </CardHeader>
  );
}

export function FormError({ isPending, state }) {
  return (
    <>
      {!isPending && state?.message?.trim() && (
        <p className="text-xs pl-2 text-center italic text-red-400">
          {state.message || ''}
        </p>
      )}
    </>
  );
}

interface FormLabel {
  children: React.ReactNode;
  name?: string;
  textCenter?: boolean;
}

export function FormLabel({ children, name, textCenter = false }: FormLabel) {
  return (
    <label htmlFor={name} className={`${textCenter && 'text-center'} text-xs`}>
      {children}
    </label>
  );
}

export function FormSelect({ value, name, data }) {
  const labels = {
    Id_cliente: 'Cliente',
    Id_proveedor: 'Proveedor',
    Id_categoria: 'Categoría',
    Municipio: 'Municipio',
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <FormLabel name={name}>
        <span>{labels[name]}</span>
      </FormLabel>
      <select
        id={name}
        name={name}
        className="flex rounded-lg text-xs h-9 px-3 w-full border"
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
