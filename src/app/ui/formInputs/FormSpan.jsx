export default function FormSpan({ name, holder, value, type = 'text' }) {
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