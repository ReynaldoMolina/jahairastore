import { bgColors } from "@/app/ui/bgcolors";
import getDate from "@/app/lib/getDate";

export function FormDiv({ children }) {
  return (
    <div className="flex w-full items-end gap-3">
      {children}
    </div>
  );
}

export function FormInput({ name, holder, value, type = 'text', autocomplete = 'off', required = true, color = "gray" }) {
  const bgColor = bgColors[color];

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
        className={`flex ${bgColor} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
        placeholder={holder}
        autoComplete={autocomplete}
        defaultValue={value}
        required={required}
      ></input>
    </div>
  )
}

export function FormInputState({ name, holder, value, setValue, color = "gray" }) {
  const bgColor = bgColors[color];

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
        className={`flex ${bgColor} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
        placeholder={holder}
        autoComplete="off"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        required={true}
      ></input>
    </div>
  )
}

export function FormSpan({ name, holder, value, type = 'text', color = "gray" }) {
  const bgColor = bgColors[color];

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
        className={`flex ${bgColor} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
      >
        {type === 'text' ? value : value.toFixed(2)}
      </span>
    </div>
  )
}

export function FormDate({ date }) {
  const currentDate = getDate();
  const bgColor = bgColors.gray;
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor="Fecha"
        className="w-full text-xs pl-2 font-semibold"
      >Fecha</label>
      <input
        id="Fecha"
        name="Fecha"
        type="date"
        className={`flex ${bgColor} items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full`}
        defaultValue={date ? date : currentDate}
      ></input>
    </div>
  )
}