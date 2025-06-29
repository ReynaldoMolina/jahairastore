import LogoMinimal from "@/app/ui/icons/logominimal.svg";
import LogoutForm from "../login/LogoutForm";

export default function Header({ allowSearch = false }) {
  return (
    <header className="flex gap-2 justify-between items-center border-b-1 border-b-neutral-200 dark:border-b-neutral-700 p-1 pt-0 bg-transparent relative">
      <h1 className="font-semibold">Jahaira Store</h1>
      <div className="flex items-center gap-1">
        <LogoutForm />
        <LogoMinimal className="size-9 p-2 rounded-full hover:bg-white hover:dark:bg-neutral-700 cursor-pointer transition" />
      </div>
    </header>
  )
}