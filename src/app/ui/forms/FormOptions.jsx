import Link from "next/link";
import ReceiptsIcon from "@/app/ui/icons/receipts.svg";
import OrdersIcon from "@/app/ui/sidemenu/SideMenuIcon/orders.svg";

export function ClientOptions({ client }) {
  return (
    <FormOptionContainer>
      <FormOption label="Pedidos" href={`/pedidos?query=${client.Nombre} ${client.Apellido}`}>
        <OrdersIcon className="size-5 text-black" />
      </FormOption>
      <FormOption label="Recibos" href={`/recibos?query=${client.Nombre} ${client.Apellido}`}>
        <ReceiptsIcon className="size-5 text-black" />
      </FormOption>
    </FormOptionContainer>
  );
}

export function FormOptionContainer({ children }) {
  return (
    <div className="flex justify-around gap-3">
      {children}
    </div>
  );
}

export function FormOption({ label, children, href }) {
  return (
    <Link
      href={href}
      className="flex justify-center items-center bg-sky-200 rounded-xl py-2 px-4 cursor-pointer shadow-xs gap-2 h-full">
      {children}
      <label className="text-xs font-semibold text-black cursor-pointer">
        {label}
      </label>
    </Link>
  )
}