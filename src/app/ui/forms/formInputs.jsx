import { getCategoriesSelect, getProvidersSelect, getClientsSelect } from "@/app/lib/data";
import getDate from "@/app/lib/getDate";
import Link from "next/link"

export function FormContainer({ children, action }) {
  return (
    <form
    action={action}
    className={`flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-md gap-4 mx-auto max-w-130 p-3 w-full`}>
      {children}
    </form>
  );
}

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

export function FormInput({ name, holder, value, type = 'text', autocomplete = 'off', required = true, color = "bg-gray-100 dark:bg-neutral-700" }) {
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
        step="0.01"
        className={`flex ${color} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
        placeholder={holder}
        autoComplete={autocomplete}
        defaultValue={value}
        required={required}
      ></input>
    </div>
  )
}

export function FormSpan({ name, holder, value, type = 'text', color = "bg-gray-100 dark:bg-neutral-700 " }) {
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

export function FormDate({ name, date }) {
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
        className="flex bg-gray-100 dark:bg-neutral-700 items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        defaultValue={date ? date : currentDate}
      ></input>
    </div>
  )
}

export function FormId({ holder, value }) {
  return (
    <span
      name="id"
      id="id"
      className="flex bg-sky-200 text-black font-semibold justify-center items-center rounded-xl text-xs h-8 px-3 w-full"
    >
      {holder} {value}
    </span>
  )
}

export async function ReceiptStateSelect() {
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor="Estado"
        className="w-full text-xs pl-2 font-semibold"
      >
        Estado
      </label>
      <select
        id="Estado"
        name="Estado"
        className="flex bg-gray-100 dark:bg-neutral-700 rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        defaultValue="Activo"
      >
        <option value="" disabled>Selecciona una opción</option>
          <option value="Activo">Activo</option>
          <option value="Anulado">Anulado</option>
      </select>
    </div>
  );
}

export async function FormSelectProveedor({ value }) {
  const data = await getProvidersSelect();
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor="Id_proveedor"
        className="w-full text-xs pl-2 font-semibold"
      >
        Proveedor
      </label>
      <select
        id="Id_proveedor"
        name="Id_proveedor"
        className="flex bg-gray-100 dark:bg-neutral-700 rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        defaultValue={value}
      >
        <option value="" disabled>Selecciona una opción</option>
        {data.map((option) => {
          return (
            <option
              key={option.Id_proveedor}
              value={option.Id_proveedor}
            >{option.Nombre_empresa}</option>
          )
        })}
      </select>
    </div>
  );
}

export async function FormSelectCategoria({ value }) {
  const data = await getCategoriesSelect();
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor="Id_categoria"
        className="w-full text-xs pl-2 font-semibold"
      >
        Categoría
      </label>
      <select
        id="Id_categoria"
        name="Id_categoria"
        className="flex bg-gray-100 dark:bg-neutral-700 rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        defaultValue={value}
      >
        <option value="" disabled>Selecciona una opción</option>
        {data.map((option) => {
          return (
            <option
              key={option.Id_categoria}
              value={option.Id_categoria}
            >{option.Nombre_categoria}</option>
          )
        })}
      </select>
    </div>
  );
}

export async function FormSelectClient({ value = "" }) {
  const data = await getClientsSelect();
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor="Id_cliente"
        className="w-full text-xs pl-2 font-semibold"
      >
        Cliente
      </label>
      <select
        id="Id_cliente"
        name="Id_cliente"
        className="flex bg-gray-100 dark:bg-neutral-700 rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        defaultValue={value}
        required
      >
        <option value="" disabled>Selecciona un cliente</option>
        {data.map((option) => {
          return (
            <option
              key={option.Id_cliente}
              value={option.Id_cliente}
            >{option.NombreCompleto}</option>
          )
        })}
      </select>
    </div>
  );
}