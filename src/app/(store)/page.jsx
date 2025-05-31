import Logo from "@/app/ui/login/logo.svg";

export const metadata = {
  title: 'Home'
}

export default function Page() {
  return (
    <section className="flex flex-col justify-center items-center h-full">
      <Logo className="size-40" />
      <h1 className="text-center text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500">Elegancia y tendencias de Shein a tu alcance</h1>
    </section>
  );
};