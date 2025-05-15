import getDate from "@/app/lib/getDate";
import Link from "next/link"

export function FormButtons({ link, label }) {
  return (
    <div className="flex w-full justify-center gap-3">
      <Link
        href={link}
        className="flex items-center justify-center rounded-xl font-semibold cursor-pointer h-9 w-full sm:w-35 bg-red-500 text-xs text-white"
      >Cancelar</Link>
      <button
        type="submit"
        value="Save"
        className="flex items-center justify-center rounded-xl font-semibold cursor-pointer h-9 w-full sm:w-35 bg-green-600 text-xs text-white"
      >{label}</button>
    </div>
  )
}

export function FormDiv({ children }) {
  return (
    <div className="flex w-full items-end gap-3">
      {children}
    </div>
  );
}

export function FormInput({ name, holder, value, type = 'text', autocomplete = 'off' }) {
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
        type={type}
        min={0}
        className="flex bg-gray-100 dark:bg-neutral-600 items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        placeholder={holder}
        autoComplete={autocomplete}
        defaultValue={value}
      ></input>
    </div>
  )
}

export function FormSpan({ name, holder, value, type = 'text' }) {
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
        className="flex bg-gray-100 dark:bg-neutral-600 items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full"
      >
        {type === 'text' ? value : value.toFixed(2)}
      </span>
    </div>
  )
}

export function FormDate({ name }) {
  const currentDate = getDate();
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor={name}
        className="w-full text-xs pl-2 font-semibold"
      >Fecha</label>
      <input
        id={name}
        name={name}
        type="date"
        className="flex bg-gray-100 dark:bg-neutral-600 items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        defaultValue={currentDate}
      ></input>
    </div>
  )
}