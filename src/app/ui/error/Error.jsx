export default function Error({ errorMessage }) {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-3">
      <p className="text-xs text-center">Ha ocurrido un error</p>
      <p className="text-xs text-center text-red-700">"{errorMessage}"</p>
      <button
        className="rounded-xl py-2 px-5 bg-red-200 cursor-pointer text-xs"
      >Reintentar</button>
    </div>
  )
}