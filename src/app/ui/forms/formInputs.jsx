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

export function FormInput({ name, holder, value, type = 'text', autocomplete = 'off', required = true }) {
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
        className="flex bg-gray-100 dark:bg-neutral-600 items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        placeholder={holder}
        autoComplete={autocomplete}
        defaultValue={value}
        required={required}
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
        className="flex bg-gray-100 dark:bg-neutral-600 items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full"
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
      className="flex bg-sky-200 dark:bg-sky-800 font-semibold justify-center items-center rounded-xl text-xs h-8 px-3 w-full"
    >
      {holder} {value}
    </span>
  )
}

export function FormSelectProveedor({ value, data }) {
  
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor="Proveedor"
        className="w-full text-xs pl-2 font-semibold"
      >
        Proveedores
      </label>
      <select
        id="Proveedor"
        name="Proveedor"
        className="flex bg-gray-100 dark:bg-neutral-600 rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        defaultValue={value}
      >
        <option value="" disabled>Selecciona una opción</option>
        {data.map((opt) => {
          return (
            <option
              key={opt.Id_proveedor}
              value={opt.Id_proveedor}
            >{opt.Nombre_empresa}</option>
          )
        })}
      </select>
    </div>
  );
}

export function FormSelectCategoria({ value, data }) {
  
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor="Categoria"
        className="w-full text-xs pl-2 font-semibold"
      >
        Categorías
      </label>
      <select
        id="Categoria"
        name="Categoria"
        className="flex bg-gray-100 dark:bg-neutral-600 rounded-xl shadow-sm text-xs h-8 px-3 w-full"
        defaultValue={value}
      >
        <option value="" disabled>Selecciona una opción</option>
        {data.map((opt) => {
          return (
            <option
              key={opt.Id_categoria}
              value={opt.Id_categoria}
            >{opt.Nombre_categoria}</option>
          )
        })}
      </select>
    </div>
  );
}