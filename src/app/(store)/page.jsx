import Logo from '@/app/ui/icons/logo.svg';

export default function Page() {
  return (
    <section className="flex flex-col justify-center items-center grow">
      <Logo className="size-40" />
      <div className="flex flex-col gap-3">
        <h1 className="text-center text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500">
          Elegancia y tendencias de Shein a tu alcance
        </h1>
        <h2 className="text-center text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500">
          ¡Hola, Jahaira! ¡Vos podés!
        </h2>
      </div>
    </section>
  );
}
