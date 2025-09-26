import Link from 'next/link';
import ReceiptsIcon from '@/app/ui/icons/receipts.svg';
import OrdersIcon from '@/app/ui/sidemenu/SideMenuIcon/orders.svg';
import SalesIcon from '@/app/ui/sidemenu/SideMenuIcon/pos.svg';

export function ClientOptions({ client }) {
  const nombreCliente = `${client.Nombre} ${client.Apellido}`;
  return (
    <FormOptionContainer>
      <FormOption label="Ver pedidos" href={`/pedidos?query=${nombreCliente}`}>
        <OrdersIcon className="size-5 text-black" />
      </FormOption>
      <FormOption label="Ver recibos" href={`/recibos?query=${nombreCliente}`}>
        <ReceiptsIcon className="size-5 text-black" />
      </FormOption>
      <FormOption label="Ver ventas" href={`/ventas?query=${nombreCliente}`}>
        <SalesIcon className="size-5 text-black" />
      </FormOption>
    </FormOptionContainer>
  );
}

export function FormOptionContainer({ children }) {
  return (
    <div className="flex justify-around p-2 gap-3 items-end">{children}</div>
  );
}

export function FormOption({ label, children, href }) {
  return (
    <Link
      href={href}
      className="flex justify-center items-center bg-sky-200 hover:bg-sky-300 rounded-lg py-2 px-3 cursor-pointer shadow-xs gap-2 min-h-9 h-full"
    >
      {children}
      <label className="text-xs font-bold text-black cursor-pointer">
        {label}
      </label>
    </Link>
  );
}
