export default function FormInput({ name, holder, value, type = 'text', readonly = false, autocomplete = 'off' }) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor={name}
        className="w-full text-xs pl-2 font-semibold"
      >
        {holder}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={`flex bg-gray-100 dark:bg-neutral-600 items-center rounded-xl shadow-sm text-xs h-8 px-3 w-full ${readonly || "hover:outline-1 hover:outline-neutral-400 focus-within:outline-1 focus-within:outline-neutral-400"} ${readonly && " focus-within:outline-0"}`}
        placeholder={holder}
        defaultValue={value}
        readOnly={readonly}
        autoComplete={autocomplete}
      >
      </input>
    </div>
  )
}