import {
  getCategoriesSelect,
  getProvidersSelect,
  getClientsSelect,
} from '@/app/lib/data';
import { inter } from '@/app/ui/fonts';
import getDate from '@/app/lib/getDate';
import Link from 'next/link';
import { bgColors } from '@/app/ui/bgcolors';

// export function FormContainer({ children, action }) {
//   return (
//     <form
//       action={action}
//       className="flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-md gap-4 mx-auto max-w-140 p-3 w-full h-fit"
//     >
//       {children}
//     </form>
//   );
// }

// export function FormButtons({ link, label }) {
//   return (
//     <div className="flex w-full justify-center gap-3">
//       <Link
//         href={link}
//         className="flex items-center justify-center rounded-xl font-semibold cursor-pointer h-9 w-full sm:w-35 bg-red-500 text-xs text-white hover:bg-red-600 transition"
//       >
//         Cancelar
//       </Link>
//       <button
//         type="submit"
//         value="Save"
//         className="flex items-center justify-center rounded-xl font-semibold cursor-pointer h-9 w-full sm:w-35 bg-green-600 hover:bg-green-700 text-xs text-white transition"
//       >
//         {label}
//       </button>
//     </div>
//   );
// }

// export function FormDiv({ children }) {
//   return <div className="flex w-full items-end gap-2 md:gap-3">{children}</div>;
// }

// export function FormInput({
//   name,
//   holder,
//   value,
//   type = 'text',
//   autocomplete = 'off',
//   required = true,
// }) {
//   return (
//     <div className="flex flex-col w-full gap-1">
//       <FormLabel name={name}>{holder}</FormLabel>
//       <input
//         id={name}
//         name={name}
//         type={type}
//         min={0}
//         step="0.01"
//         className="flex items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full"
//         placeholder={holder}
//         autoComplete={autocomplete}
//         defaultValue={value}
//         required={required}
//       ></input>
//     </div>
//   );
// }

// export function FormSpan({
//   name,
//   holder,
//   value,
//   type = 'text',
//   color = 'gray',
// }) {
//   const bgColor = bgColors[color];

//   return (
//     <div className="flex flex-col w-full gap-1">
//       <label htmlFor={name} className="w-full text-xs pl-2 font-semibold">
//         {holder}
//       </label>
//       <span
//         name={name}
//         id={name}
//         className={`flex ${bgColor} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
//       >
//         {type === 'text' ? value : value.toFixed(2)}
//       </span>
//     </div>
//   );
// }

// export function FormDate({ date }) {
//   const bgColor = bgColors.gray;
//   const currentDate = getDate();
//   return (
//     <div className="flex flex-col w-full gap-1">
//       <label htmlFor="Fecha" className="w-full text-xs pl-2 font-semibold">
//         Fecha
//       </label>
//       <input
//         id="Fecha"
//         name="Fecha"
//         type="date"
//         className={`flex ${bgColor} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
//         defaultValue={date ? date : currentDate}
//       ></input>
//     </div>
//   );
// }

// export function FormId({ holder, value = '' }) {
//   return (
//     <span
//       name="id"
//       id="id"
//       className="flex bg-sky-200 text-black font-bold justify-center items-center rounded-lg text-sm h-9 px-3 w-full"
//     >
//       {holder} {value}
//     </span>
//   );
// }

export async function FormSelect({ value, name, label }) {
  const getOptions = {
    Id_cliente: getClientsSelect,
    Id_proveedor: getProvidersSelect,
    Id_categoria: getCategoriesSelect,
  };

  const data = await getOptions[name]?.();

  return (
    <div className="flex flex-col w-full gap-1">
      <FormLabel name={name}>
        <span className="font-bold">{label}</span>
      </FormLabel>
      <select
        id={name}
        name={name}
        className={`flex ${bgColors.borderColor} dark:bg-neutral-900 rounded-lg text-xs h-9 px-3 w-full`}
        defaultValue={value}
        required
      >
        <option value="" disabled className="text-sm">
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

function FormLabel({ children, name }) {
  return (
    <label htmlFor={name} className="w-full text-xs px-3 font-bold">
      {children}
    </label>
  );
}
